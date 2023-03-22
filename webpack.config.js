const path = require('path');

const frontEnd = {
  entry: './src/frontend',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist', 'frontend'),
    filename: 'frontend.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};


const backEnd = {
  entry: './src/backend',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist', 'backend'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};


module.exports = [frontEnd, backEnd];
