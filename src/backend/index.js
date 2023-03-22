const express = require('express');
const path = require('path');

const app = express();
const port = 9876;

app.use(express.static(path.join('dist', 'frontend')))
app.use('/ting', (req, res) => {
  res.send('boo ya');
});

app.listen(port, () => {
  console.log('server listening on', port);
});
