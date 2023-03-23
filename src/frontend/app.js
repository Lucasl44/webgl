import React, { useState, useRef, useEffect } from 'react';
import { shader } from './archive/shader.js';
import { triangleShader } from './triangleShader.js';

export const App = () => {
  const [el, setEl] = useState(null);
  const style = {
  };

  useEffect(() => {
    triangleShader(el)
  }, [el]);

  return (
    <canvas
      style={style}
      ref={el => setEl(el)}
    />
  );
};
