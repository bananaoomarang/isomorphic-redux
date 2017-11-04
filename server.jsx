import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from './shared/routes';
import { Provider }              from 'react-redux';
import * as reducers             from 'reducers';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';

const app = express();

// here in non-production env we run webpack in watch
// mode with hot module replacement
if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use( (req, res) => {
  const location = createLocation(req.url);

  // here we do the usual redux stuff - exactly the sameis done client-side
  const reducer  = combineReducers(reducers);

  // Here we apply promise middleware, which will hook into an Redux processing chain
  // in case the dispatched action contains a promise. When the promise is resolved,
  // the middleware will automatically fire a new action, marking the completion
  // of the async operation.
  // On the other hand, if the original action doen not contain a promisse,
  // the processing goes through as usual - the middleware does nothing.
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  // docs: https://knowbody.github.io/react-router-docs/api/match.html
  // here we match a set of routes to a location, without rendering
  // ... this is beacause on server-side can't render things the usual way, since there's no DOM to render to
  // ... we'll instead manually render components to string by using [renderToString]
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    
    if (redirectLocation){
      const location = redirectLocation.pathname + redirectLocation.search;
      return res.redirect(302, location);
    }

    // if no route matches the given location, this param is not set
    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {

      // https://knowbody.github.io/react-router-docs/api/RouterContext.html
      // Here instead of using <Router> component, we use <RouterContext>,
      // which doesn't need access to browser history API, which is unavailable at server side.
      // (FYI  <RouterContext> is used internaly by <Router>)
      // NOTE: take a look inside [client/index.html] how rendeding is done
      //       and contrast it with the below code block
      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      // here we convert components to plain HTML string ... pretty straight forward
      const componentHTML = renderToString(InitialView);

      // we extract state so that we can inject it into the
      // HTML ... it will be serialized to JSON
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

    // [fetchComponentData] discoveres and dispatches actions,
    // which are prerequisite for some components to be rendered.
    // It returns a promise, which will be resolved when
    // all the async actions have been completed.
    // 
    // In our case the [Home] component can't be rendered until
    // the "getTodos" action has been completed - in other words
    // before data has been retrived from the database
    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      // after the data has been fetched from the server, we can render our HTML
      .then(renderView)
      // writing the HTML to the server response
      .then(html => res.end(html))
      // in case of an error, output error message
      .catch(err => res.end(err.message));
  });
});

export default app;
