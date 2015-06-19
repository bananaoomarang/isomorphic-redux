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

      React.createElement("html", null, 
        React.createElement("head", null, 
          React.createElement("meta", {charset: "utf-8"}), 
          React.createElement("title", null, "Flux Demo")
       ), 

       React.createElement("body", null, 
         React.createElement(FluxComponent, {flux: flux}, 
            React.createElement(Handler, React.__spread({},  state))
         )
       )
     )

    );


    var html = React.renderToString(View);

    res.end(html);

    next();
  });
});

module.exports = app;
