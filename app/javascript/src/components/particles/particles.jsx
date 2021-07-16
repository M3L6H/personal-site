import React, { useEffect, useRef } from "react";
import { withWindowDimensions } from "../hocs";

const randFloat = (range=2) => Math.random() * range - (range / 2.0);

const numPoints = 100;
const data = []; // x, y, xVel, yVel

for (let i = 0; i < numPoints * 4; ++i) data.push(randFloat() / (Math.floor((i % 4) / 2) * 20 + 1));

const initializeWebGL = (canvasRef, windowWidth, windowHeight) => {
  if (!canvasRef.current) return null;

  let gl = canvasRef.current.getContext("webgl");

  if (!gl) {
    console.warn("Your browser does not support webgl natively. Falling back on experimental-webgl");
    gl = canvasRef.current.getContext("experimental-webgl");
  }

  if (!gl) {
    console.error("Your browser does not support webgl");
    return null;
  }
  
  gl.canvas.width = windowWidth;
  gl.canvas.height = windowHeight;
  gl.viewport(0, 0, windowWidth, windowHeight);

  return gl;
};

// const circleShaders = (gl, numVerts) => {
//   const vertexIds = new Float32Array(numVerts);
//   vertexIds.forEach((_, i) => { vertexIds[i] = i; });

//   const idBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, vertexIds, gl.STATIC_DRAW);

//   const CIRCLE_VERTEX_SHADER = `
//   precision mediump float;

//   attribute float vertexId;
//   uniform float numVerts;
//   uniform vec2 resolution;

//   #define PI radians(180.0)

//   vec2 computeCircleTriangleVertex(float vertexId) {
//     float numSlices = 8.0;
//     float sliceId = floor(vertexId / 3.0);
//     float triVertexId = mod(vertexId, 3.0);
//     float edge = triVertexId + sliceId;
//     float angleU = edge / numSlices;  // 0.0 to 1.0
//     float angle = angleU * PI * 2.0;
//     float radius = step(triVertexId, 1.5);
//     return vec2(cos(angle), sin(angle)) * radius;
//   }

//   float hash(float p) {
//     vec2 p2 = fract(vec2(p * 5.3983, p * 5.4427));
//     p2 += dot(p2.yx, p2.xy + vec2(21.5351, 14.3137));
//     return fract(p2.x * p2.y * 95.4337);
//   }

//   void main() {
//     float numSlices = 8.0;
//     float numVertsPerCircle = numSlices * 3.0;
//     float circleId = floor(vertexId / numVertsPerCircle);
//     float numCircles = numVerts / numVertsPerCircle;

//     float u = circleId / numCircles;
//     float angle = u * PI * 2.0;
//     float radius = 0.8;

//     vec2 pos = vec2(cos(angle), sin(angle)) * radius;

//     vec2 triPos = computeCircleTriangleVertex(vertexId) * 0.1;
    
//     float aspect = resolution.y / resolution .x;
//     vec2 scale = vec2(aspect, 1);
    
//     gl_Position = vec4((pos + triPos) * scale, 0, 1);
//   }
//   `;

//   const CIRCLE_FRAGMENT_SHADER = `
//   precision mediump float;

//   void main() {
//     gl_FragColor = vec4(0, 0, 1, 1);
//   }
//   `;

//   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
//   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

//   gl.shaderSource(vertexShader, CIRCLE_VERTEX_SHADER);
//   gl.shaderSource(fragmentShader, CIRCLE_FRAGMENT_SHADER);

//   gl.compileShader(vertexShader);
//   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
//     console.error("Error compiling circle vertex shader", gl.getShaderInfoLog(vertexShader));
//     return null;
//   }
  
//   gl.compileShader(fragmentShader);
//   if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
//     console.error("Error compiling circle fragment shader", gl.getShaderInfoLog(fragmentShader));
//     return null;
//   }

//   return {
//     idBuffer,
//     vs: vertexShader,
//     fs: fragmentShader
//   };
// };

const compileShader = (gl, shaderText, shaderType) => {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderText);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compiling shader", gl.getShaderInfoLog(shader), shaderText);
    return null;
  }

  return shader;
};

const compileShaders = gl => {
  const VERTEX_SHADER = `
  precision mediump float;

  attribute vec2 a_pos;
  attribute vec2 a_vel;

  uniform float u_time;

  void main() {
    vec2 pos = a_pos + (a_vel * u_time);
    float x = mod(pos.x, 2.0) - 1.0;
    float y = mod(pos.y, 2.0) - 1.0;
    
    gl_Position = vec4(x, y, 0.0, 1.0);
    gl_PointSize = 2.0;
  }
  `;

  const FRAGMENT_SHADER = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0.871,0.431,0.294, 1.0);
  }
  `;

  return [
    compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER),
    compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER)
  ];
};

let rAF;

const render = (time, webgl) => {
  time *= 0.001;
  time %= 1000;
  const { gl, program, posLoc, velLoc } = webgl;
  gl.vertexAttribPointer(
    posLoc,
    2,
    gl.FLOAT,
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.vertexAttribPointer(
    velLoc,
    2,
    gl.FLOAT,
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );

  gl.enableVertexAttribArray(posLoc);
  gl.enableVertexAttribArray(velLoc);

  const timeLoc = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(timeLoc, time);

  // Main rendering
  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0, numPoints);
  
  rAF = requestAnimationFrame(t => render(t, webgl));
};

const Particles = ({ windowHeight, windowWidth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = initializeWebGL(canvasRef, windowWidth, windowHeight);

    if (!gl) return () => cancelAnimationFrame(rAF);

    const [vs, fs] = compileShaders(gl);

    if (!vs || !fs) return () => cancelAnimationFrame(rAF);

    // Initialize program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Error linking program", gl.getProgramInfoLog(program));
      return () => cancelAnimationFrame(rAF);
    }

    if (process.env.NODE_ENV !== "production") {
      gl.validateProgram(program);
      if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("Error validating program", gl.getProgramInfoLog(program));
        return () => cancelAnimationFrame(rAF);
      }
    }

    if (rAF) cancelAnimationFrame(rAF);

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, "a_pos");
    const velLoc = gl.getAttribLocation(program, "a_vel");

    const dataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    rAF = requestAnimationFrame(time => render(time, { gl, program, posLoc, velLoc }));

    return () => cancelAnimationFrame(rAF);
  }, [windowHeight, windowWidth]);
  
  return (
    <canvas ref={ canvasRef } id="particles-canvas"></canvas>
  );
};

Particles.displayName = "Particles";

export default withWindowDimensions(Particles);
