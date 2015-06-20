'use strict';
require('babel/register');

var server = require('./server');

const PORT = 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
