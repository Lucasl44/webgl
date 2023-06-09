export function shaderPoints(el) {
  if (el) {
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    const program = gl.createProgram();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    const vShaderSource = `
      attribute vec2 position;
      void main() {
        gl_PointSize = 5.;
        gl_Position = vec4(position / 2., 0, 1);
      }
    `;

    const fShaderSource = `
      void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
      }
    `;

    compileShader(gl, vertexShader, vShaderSource);
    compileShader(gl, fragmentShader, fShaderSource);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    const positionPointer = gl.getAttribLocation(program, 'position');
    const points = [];
    for (let i = 1; i <= 100; i++) {
      points.push(Math.cos(i), Math.cos(i));
    }
    const positionData = new Float32Array(points);
    const positionBuffer = gl.createBuffer(gl.ARRAY_BUFFER);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);

    const attributeSize = 2;
    const type = gl.FLOAT;
    const normalised = false;
    const stride = 0;
    const offset = 0;

    gl.enableVertexAttribArray(positionPointer);
    gl.vertexAttribPointer(positionPointer, attributeSize, type, normalised, stride, offset);

    gl.drawArrays(gl.POINTS, 0, positionData.length / 2);
  }
}

function compileShader(gl, shader, source) {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const log = gl.getShaderInfoLog(shader);

  if (log) {
    throw new Error(log);
  }
}
