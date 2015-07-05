import express         from 'express';
import React           from 'react';
import Router          from 'react-router';
import routes          from './shared/routes';
import { createRedux } from 'redux';
import { Provider }    from 'redux/react';
import * as stores     from './shared/stores';

var app = express();

app.use(function (req, res, next) {
  const redux = createRedux(stores);

  let path = req.path;

  Router.run(routes, path, function (Handler, state) {
    var View = (
          <Provider redux={redux}>
            {() =>
              <Handler {...state} />
            }
          </Provider>
    );

    var html = React.renderToString(View);

    res.end(html);

    next();
  });
});

module.exports = app;
