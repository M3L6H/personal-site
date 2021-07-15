import React, { useRef } from "react";

export default function particles() {
  const canvasRef = useRef(null);
  
  return (
    <canvas ref={ canvasRef }>
      
    </canvas>
  );
}
