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
  uniform vec2 resolution;

  #define PI radians(180.0)

  void main() {
    float u = vertexId / numVerts;
    float angle = u * PI * 2.0;
    float radius = 0.8;

    vec2 pos = vec2(cos(angle), sin(angle)) * radius;

    float aspect = resolution.y / resolution.x;
    vec2 scale = vec2(aspect, 1);

    gl_Position = vec4(pos * scale, 0, 1);
    gl_PointSize = 5.0;
  }
  `;

  const CIRCLE_FRAGMENT_SHADER = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
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

const Particles = ({ windowHeight, windowWidth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = initializeWebGL(canvasRef, windowWidth, windowHeight);

    if (!gl) return;

    const numVerts = 20;
    const { idBuffer, vs, fs } = circleShaders(gl, numVerts);

    // Initialize program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Error linking program", gl.getProgramInfoLog(program));
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      gl.validateProgram(program);
      if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("Error validating program", gl.getProgramInfoLog(program));
        return;
      }
    }

    gl.useProgram(program);

    const vertexIdLoc = gl.getAttribLocation(program, "vertexId");
    const numVertsLoc = gl.getUniformLocation(program, "numVerts");
    const resolutionLoc = gl.getUniformLocation(program, "resolution");

    gl.enableVertexAttribArray(vertexIdLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);

    gl.vertexAttribPointer(vertexIdLoc, 1, gl.FLOAT, false, 0, 0);

    gl.uniform1f(numVertsLoc, numVerts);

    gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

    // Main rendering
    gl.drawArrays(gl.POINTS, 0, numVerts);
    // gl.drawArrays(gl.TRIANGLES, 0, 3);
    // gl.drawArrays(gl.LINES, 0, 3);
    // gl.drawArrays(gl.LINE_STRIP, 0, 3);
    // gl.drawArrays(gl.LINE_LOOP, 0, 3);

  }, [window]);
  
  return (
    <canvas ref={ canvasRef } id="particles-canvas"></canvas>
  );
};

Particles.displayName = "Particles";

export default withWindowDimensions(Particles);
