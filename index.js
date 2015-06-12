'use strict';
require('babel/register');

var express    = require('express');
var browserify = require('browserify');
var React      = require('react');
var babelify   = require('babelify');
var app        = express();
var MainView   = require('./shared/views/index.jsx');
var AppFlux    = require('./shared/AppFlux');

app.use('/bundle.js', function (req, res) {
  res.setHeader('content-type', 'application/javascript');

  browserify('./client/index.js', {
    debug:      true,
    extensions: ['.jsx', '.js']
  })
  .transform(babelify)
  .bundle()
  .pipe(res);
});

app.use('/', function (req, res) {
  const flux = new AppFlux();

  res.setHeader('Content-Type', 'text/html');

  res.end(
    '<div id="react-view">' +
      React.renderToString(React.createElement(MainView, { flux: flux })) +
    '</div>' +
    '<script type="application/javascript" src="/bundle.js"></script>'
  );
});

var server = app.listen(3000, function() {
  console.log('Listening on 3000');
});

module.exports = server;
