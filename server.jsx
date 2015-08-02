import express             from 'express';
import React               from 'react';
import { Router }          from 'react-router';
import Location            from 'react-router/lib/Location';
import routes              from 'routes';
import { Provider }        from 'react-redux';
import * as reducers       from 'reducers';
import promiseMiddleware   from 'lib/promiseMiddleware';
import fetchComponentData  from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

const app = express();

app.use( (req, res) => {
  const location = new Location(req.path, req.query);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  Router.run(routes, location, (err, routeState) => {
    if(err) return console.error(err);

    function renderView() {
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

      return HTML;
    }

    if(routeState)
      fetchComponentData(store.dispatch, routeState.components, routeState.params)
        .then(renderView)
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
  });
});

export default app;
