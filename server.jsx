import express                          from 'express';
import React                            from 'react';
import { Router }                       from 'react-router';
import Location                         from 'react-router/lib/Location';
import routes                           from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';

const app = express();

app.use((req, res, next) => {
  const location = new Location(req.path, req.query);
  const reducer  = combineReducers(reducers);
  const store    = createStore(reducer);

  Router.run(routes, location, (err, routeState) => {
    if(err) return console.error(err);

    const InitialView = (
      <Provider store={store}>
        {() =>
          <Router {...routeState} />
        }
      </Provider>
    );

    const componentHTML = React.renderToString(InitialView);

    const initialState = store.getState();

    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux Demo</title>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
    `;

    res.end(HTML);

    next();
  });
});

export default app;
