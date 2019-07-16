const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

const appPath = path.join(__dirname, 'dist');

app.use(morgan('dev'));

app.use('/', express.static(appPath));

app.get('*', (req, res, next) => {
  return res.sendFile(path.join(appPath, 'index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT);

console.log('App started PORT#', PORT);
