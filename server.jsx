var express       = require('express');
var browserify    = require('browserify-middleware');
var React         = require('react');
var Router        = require('react-router');
var babelify      = require('babelify');
var routes        = require('./shared/routes');
var AppFlux       = require('./shared/AppFlux');
var FluxComponent = require('flummox/component');
var app           = express();

const BROWSERIFY_OPTS = {
  debug:      true,
  extensions: ['.jsx', '.js'],
  transform:  [babelify],
  precompile: true
};

app.use('/bundle.js', browserify('./client/index.jsx', BROWSERIFY_OPTS));

app.use(function (req, res, next) {
  const flux = new AppFlux();

  let path = req.path;

  Router.run(routes, path, function (Handler, state) {
    var View = (
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Flummox Demo</title>
        </head>

        <body>
          <FluxComponent flux={flux}>
            <Handler {...state} />
          </FluxComponent>
        </body>
      </html>
    );

    var html = React.renderToString(View);

    res.end(html);

    next();
  });
});

module.exports = app;
