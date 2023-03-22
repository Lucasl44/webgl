const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

const vShaderSource = `#version 300 es
  in vec2 aPos;

  void main() {
    gl_Position = vec4(aPos, 0., 1.);
  }
`;

const fShaderSource = `#version 300 es
  precision highp float;
  out vec4 fragOut;

  void main() {
    fragOut = vec4(1., 0., 0., 1.);
  }
`;


gl.shaderSource(vertexShader, vShaderSource);
gl.shaderSource(fragmentShader, fShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

const compileStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
console.log('compile status', compileStatus);
const shaderInfoLog = gl.getShaderInfoLog(fragmentShader)
console.log('shader info log', shaderInfoLog);


gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
console.log('link status', linkStatus);
const programInfoLog = gl.getProgramInfoLog(program)
console.log('program info log', programInfoLog);


const attribLocation = gl.getAttribLocation(program, 'aPos');

const buffer = gl.createBuffer(gl.ARRAY_BUFFER);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.0, 0.5, 0.5, -0.5]), gl.STATIC_DRAW);

/// ---- drawing

gl.disable(gl.CULL_FACE);

gl.useProgram(program);
gl.enableVertexAttribArray(attribLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLES, 0, 3 * 2);
gl.disableVertexAttribArray(attribLocation);
