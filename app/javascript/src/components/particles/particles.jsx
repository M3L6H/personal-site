import React, { useEffect, useRef } from "react";
import { withWindowDimensions } from "../hocs";

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
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  return gl;
};

const circleShaders = (gl, numVerts) => {
  const vertexIds = new Float32Array(numVerts);
  vertexIds.forEach((_, i) => { vertexIds[i] = i; });

  const idBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexIds, gl.STATIC_DRAW);

  const CIRCLE_VERTEX_SHADER = `
  precision mediump float;

  attribute float vertexId;
  uniform float numVerts;
  uniform float time;

  #define PI radians(180.0)

  float hash(float p) {
    vec2 p2 = fract(vec2(p * 5.3983, p * 5.4427));
    p2 += dot(p2.yx, p2.xy + vec2(21.5351, 14.3137));
    return fract(p2.x * p2.y * 95.4337);
  }

  void main() {
    float u = vertexId / numVerts;
    float off = floor(time + u) / 1000.0;
    float x = hash(u + off) * 2.0 - 1.0;
    float y = fract(time + u) * -2.0 + 1.0;

    gl_Position = vec4(x, y, 0, 1);
    gl_PointSize = 2.0;
  }
  `;

  const CIRCLE_FRAGMENT_SHADER = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0, 0, 1, 1);
  }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, CIRCLE_VERTEX_SHADER);
  gl.shaderSource(fragmentShader, CIRCLE_FRAGMENT_SHADER);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling circle vertex shader", gl.getShaderInfoLog(vertexShader));
    return null;
  }
  
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling circle fragment shader", gl.getShaderInfoLog(fragmentShader));
    return null;
  }

  return {
    idBuffer,
    vs: vertexShader,
    fs: fragmentShader
  };
};

let rAF;

const render = (gl, numVerts, program, idBuffer, time) => {
  time *= 0.001;

  gl.useProgram(program);

  const vertexIdLoc = gl.getAttribLocation(program, "vertexId");
  const numVertsLoc = gl.getUniformLocation(program, "numVerts");
  const timeLoc = gl.getUniformLocation(program, "time");

  gl.enableVertexAttribArray(vertexIdLoc);

  gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);

  gl.vertexAttribPointer(vertexIdLoc, 1, gl.FLOAT, false, 0, 0);
  gl.uniform1f(numVertsLoc, numVerts);
  gl.uniform1f(timeLoc, time);

  // Main rendering
  gl.drawArrays(gl.POINTS, 0, numVerts);
  
  rAF = requestAnimationFrame(t => render(gl, numVerts, program, idBuffer, t));
};

const Particles = ({ windowHeight, windowWidth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = initializeWebGL(canvasRef, windowWidth, windowHeight);

    if (!gl) return () => cancelAnimationFrame(rAF);

    const numVerts = 400;
    const { idBuffer, vs, fs } = circleShaders(gl, numVerts);

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

    rAF = requestAnimationFrame(time => render(gl, numVerts, program, idBuffer, time));

    return () => cancelAnimationFrame(rAF);
  }, [windowHeight, windowWidth]);
  
  return (
    <canvas ref={ canvasRef } id="particles-canvas"></canvas>
  );
};

Particles.displayName = "Particles";

export default withWindowDimensions(Particles);
