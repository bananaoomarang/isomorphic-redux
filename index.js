'use strict';

const OPTS = {
  optional: ['es7.decorators']
};

require('babel/register')(OPTS);

var server = require('./server');

const PORT = 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
