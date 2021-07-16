import React, { useEffect, useRef } from "react";
import { withWindowDimensions } from "../hocs";

const VERTEX_SHADER = `
precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;

void main() {
  fragColor = vertColor;
  gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

varying vec3 fragColor;

void main() {
  gl_FragColor = vec4(fragColor, 1.0);
}
`;

const Particles = ({ windowHeight, windowWidth }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let gl = canvasRef.current.getContext("webgl");

    if (!gl) {
      console.warn("Your browser does not support webgl natively. Falling back on experimental-webgl");
      gl = canvasRef.current.getContext("experimental-webgl");
    }

    if (!gl) {
      console.error("Your browser does not support webgl");
      return;
    }
    
    gl.canvas.width = windowWidth;
    gl.canvas.height = windowHeight;
    gl.viewport(0, 0, windowWidth, windowHeight);
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, VERTEX_SHADER);
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error("Error compiling vertex shader", gl.getShaderInfoLog(vertexShader));
      return;
    }
    
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error("Error compiling fragment shader", gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
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

    const triangleVertices = [
      // X, Y     R,   G,   B
      0.0, 0.5,   1.0, 1.0, 0.0,
      -0.5, -0.5, 0.0, 1.0, 1.0,
      0.5, -0.5,  1.0, 0.0, 1.0
    ];

    // Create buffer on GPU
    const triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      2, // Number of values in each attribute
      gl.FLOAT, // Type of the values
      gl.FALSE, // Is the data normalized?
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of a vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );

    gl.vertexAttribPointer(
      colorAttribLocation, // Attribute location
      3, // Number of values in each attribute
      gl.FLOAT, // Type of the values
      gl.FALSE, // Is the data normalized?
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of a vertex
      2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Main rendering
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
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
