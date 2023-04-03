export function shaderCircle(el) {
  if (el) {
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');

    const program = gl.createProgram();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    const vShaderSource = `
      attribute vec2 position;
      uniform vec2 resolution;

      void main() {
        vec2 transformedPosition = position / resolution * 2.0 - 1.0;
        gl_PointSize = 2.;
        gl_Position = vec4(transformedPosition, 0., 1.);
      }
    `;

    const fShaderSource = `
      precision mediump float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color / 255.;
      }
    `;

    compileShader(vertexShader, vShaderSource);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(`An error occured compiling the shaders: ${gl.getShaderInfoLog(vertexShader)}`);
      gl.deleteShader(vertexShader);
      return null;
    }
    compileShader(fragmentShader, fShaderSource);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(`An error occured compiling the shaders: ${gl.getShaderInfoLog(fragmentShader)}`);
      gl.deleteShader(fragmentShader);
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log(`Unable to initialize the shader program: ${gl.getProgramInfoLog(program)}`);
    };

    gl.useProgram(program);

    const positionPointer = gl.getAttribLocation(program, 'position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
    const colorUniformLocation = gl.getUniformLocation(program, 'color');

    gl.uniform2fv(resolutionUniformLocation, [canvas.width, canvas.height]);
    gl.uniform4fv(colorUniformLocation, [255, 0, 0, 255]);

    const triangles = createCircle(canvas.width / 2, canvas.height / 2, canvas.height / 2, 360);

    function createCircle(centerX, centerY, radius, segmentCount) {
      const vertices = [];
      const segmentAngle = Math.PI * 2 / (segmentCount - 1)
      for(let i = 0; i < Math.PI * 2; i += segmentAngle) {
        const from = i;
        const to = i + segmentAngle;
        vertices.push(centerX, centerY);
        vertices.push(centerX + Math.cos(from) * radius, centerY + Math.sin(from) * radius);
        vertices.push(centerX + Math.cos(to) * radius, centerY + Math.sin(to) * radius);

      }
      return vertices;
    }

    const positionData = new Float32Array(triangles);
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

    gl.drawArrays(gl.TRIANGLES, 0, positionData.length / 2);

    function compileShader(shader, source) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      const log = gl.getShaderInfoLog(shader);

      if (log) {
        throw new Error(log);
      }
    }
  }
}
