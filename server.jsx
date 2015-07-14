import express                          from 'express';
import React                            from 'react';
import { Router }                       from 'react-router';
import Location                         from 'react-router/lib/Location';
import routes                           from './shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from './shared/reducers';

var app = express();

app.use(function (req, res, next) {
  const location = new Location(req.path, req.query);
  const reducer  = combineReducers(reducers);
  const store    = createStore(reducer);

  Router.run(routes, location, function (err, initialState) {
    if(err) return console.error(err);

    const InitialView = (
          <Provider store={store}>
            {() =>
              <Router {...initialState} />
            }
          </Provider>
    );

    const routerHTML = React.renderToString(InitialView);

    const initialData = store.getState();

    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Chapters</title>

        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
      </head>
      <body>
        <div id="react-view">${routerHTML}</div>
      </body>
    </html>
    `;

    res.end(HTML);

    next();
  });
});

module.exports = app;
