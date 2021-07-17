import React, { useEffect, useRef } from "react";
import { withWindowDimensions } from "../hocs";

const randFloat = (range=2) => Math.random() * range - (range / 2.0);

const NUM_POINTS = 1000;
const RADIUS = 0.005;
const RESOLUTION = 8;
const POINTS_PER_TRI = 3;
const SLOWNESS = 21;
const DATA_COUNT = 5;
let data = []; // x, y, xVel, yVel, idx
let pos;
let vel;


for (let i = 0; i < NUM_POINTS * RESOLUTION * POINTS_PER_TRI; ++i) {
  if (i % (RESOLUTION * POINTS_PER_TRI) === 0) {
    pos = [randFloat(), randFloat()];
    vel = [randFloat() / SLOWNESS, randFloat() / SLOWNESS];
  }

  data = data.concat([...pos, ...vel, i % (RESOLUTION * POINTS_PER_TRI)]);
}

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
  attribute float a_idx;

  uniform float u_time;
  uniform float u_radius;
  uniform float u_resolution;
  uniform float u_scale;

  #define PI radians(180.0)
  
  void main() {
    vec2 pos = a_pos + (a_vel * u_time);
    float w = 2.0 + u_radius + u_radius;
    float hw = w / 2.0;
    float x = mod(pos.x, w) - hw;
    float y = mod(pos.y, w) - hw;

    float triIdx = floor(a_idx / 3.0);
    float triVertexId = mod(a_idx, 3.0);
    float edgeId = triVertexId + triIdx;
    float angle = edgeId / u_resolution * PI * 2.0;
    float radius = step(triVertexId, 1.5) * u_radius;
    
    gl_Position = vec4((x + (cos(angle) * radius * u_scale)), y + (sin(angle) * radius), 0.0, 1.0);
    gl_PointSize = 2.0;
  }
  `;

  const FRAGMENT_SHADER = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0.871,0.431,0.294, 0.5);
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
  const { gl, program } = webgl;

  const timeLoc = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(timeLoc, time);

  // Main rendering
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, NUM_POINTS * RESOLUTION * POINTS_PER_TRI);
  
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

    const dataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_pos");
    const velLoc = gl.getAttribLocation(program, "a_vel");
    const idxLoc = gl.getAttribLocation(program, "a_idx");

    gl.vertexAttribPointer(
      posLoc,
      2,
      gl.FLOAT,
      gl.FALSE,
      DATA_COUNT * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.vertexAttribPointer(
      velLoc,
      2,
      gl.FLOAT,
      gl.FALSE,
      DATA_COUNT * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.vertexAttribPointer(
      idxLoc,
      1,
      gl.FLOAT,
      gl.FALSE,
      DATA_COUNT * Float32Array.BYTES_PER_ELEMENT,
      4 * Float32Array.BYTES_PER_ELEMENT
    );
  
    gl.enableVertexAttribArray(posLoc);
    gl.enableVertexAttribArray(velLoc);
    gl.enableVertexAttribArray(idxLoc);

    const diamLoc = gl.getUniformLocation(program, "u_radius");
    gl.uniform1f(diamLoc, RADIUS);

    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    gl.uniform1f(resolutionLoc, RESOLUTION);

    const scaleLoc = gl.getUniformLocation(program, "u_scale");
    gl.uniform1f(scaleLoc, windowHeight / windowWidth);

    rAF = requestAnimationFrame(time => render(time, { gl, program }));

    return () => cancelAnimationFrame(rAF);
  }, [windowHeight, windowWidth]);
  
  return (
    <canvas ref={ canvasRef } id="particles-canvas"></canvas>
  );
};

Particles.displayName = "Particles";

export default withWindowDimensions(Particles);
