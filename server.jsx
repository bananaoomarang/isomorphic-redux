import fs                  from 'fs';
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

const isProduction = process.env.NODE_ENV === 'production';

// So the example quote unquote 'production mode' works
if (isProduction) {
  app.use('/bundle.js', function (req, res) {
    return fs.createReadStream('./dist/bundle.js').pipe(res);
  });
}

const bundlePath = isProduction ?
  '/bundle.js' : 'http://localhost:8080/bundle.js'

app.use( (req, res) => {
  const location = new Location(req.path, req.query);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  Router.run(routes, location, (err, routeState) => {
    if(err) return console.error(err);

    if(!routeState) return res.status(404).end('404');

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
          <script type="application/javascript" src="${bundlePath}"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, routeState.components, routeState.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
