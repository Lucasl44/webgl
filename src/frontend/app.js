import React, { useState, useRef, useEffect } from 'react';
import { shader } from './archive/shader.js';
import { shaderPoints } from './shaderPoints.js';

export const App = () => {
  const [el, setEl] = useState(null);
  const style = {
  };

  useEffect(() => {
    shaderTriangle(el)
  }, [el]);

  return (
    <canvas
      style={style}
      ref={el => setEl(el)}
    />
  );
};
