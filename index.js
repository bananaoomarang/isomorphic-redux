'use strict';
require('babel/register');

var express    = require('express');
var browserify = require('browserify-middleware');
var React      = require('react');
var babelify   = require('babelify');
var app        = express();
var MainView   = require('./shared/views/index.jsx');
var AppFlux    = require('./shared/AppFlux');

var browserifyOpts = {
  debug:      true,
  extensions: ['.jsx', '.js'],
  transform:  [babelify]
};

app.use('/bundle.js', browserify('./client/index.jsx', browserifyOpts))

app.use('/', function (req, res) {
  const flux = new AppFlux();

  res.setHeader('Content-Type', 'text/html');

  res.end(
    '<div id="react-view">' +
       React.renderToString(React.createElement(MainView, { flux: flux })) +
    '</div>'

  );
});

var server = app.listen(3000, function() {
  console.log('Listening on 3000');
});

module.exports = server;
