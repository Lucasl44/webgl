import React, { useState, useRef, useEffect } from 'react';
import { shader } from './archive/shader.js';
import { shaderCircle } from './shaderTriangle.js';

export const App = () => {
  const [el, setEl] = useState(null);
  const style = {
  };

  useEffect(() => {
    shaderCircle(el)
  }, [el]);

  return (
    <canvas
      style={style}
      ref={el => setEl(el)}
    />
  );
};
