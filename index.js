'use strict';
require('babel/register');

var express       = require('express');
var browserify    = require('browserify-middleware');
var React         = require('react');
var Router        = require('react-router');
var babelify      = require('babelify');
var routes        = require('./shared/routes');
var AppFlux       = require('./shared/AppFlux');
var FluxComponent = require('flummox/component');
var app           = express();

var browserifyOpts = {
  debug:      true,
  extensions: ['.jsx', '.js'],
  transform:  [babelify]
};

app.use('/bundle.js', browserify('./client/index.jsx', browserifyOpts));

app.use(function (req, res, next) {
  const flux = new AppFlux();

  let path = req.path;

  Router.run(routes, path, function (Handler, state) {
    var View = (
      React.createElement(FluxComponent, {flux: flux},
        React.createElement(Handler, React.__spread(state))
      )
    );

    var html = React.renderToString(View);

    res.end(html);

    next();
  });
});

var server = app.listen(3000, function() {
  console.log('Listening on 3000');
});

module.exports = server;
