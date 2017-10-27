import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';
import * as reducers        from 'reducers';
import routes               from 'routes';
import promiseMiddleware    from 'lib/promiseMiddleware';
import immutifyState        from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';

// [__INITIAL_STATE__] is prepared in server-side code and assigned
// to a global variable - take a look at [server.jsx]
// Here we use a helper function to conver it to an immutable object
const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);

// Here we apply promise middleware, which will hook into an Redux processing chain
// in case the dispatched action contains a promise. When the promise is resolved,
// the middleware will automatically fire a new action, marking the completion
// of the async operation.
// On the other hand, if the original action doen not contain a promisse,
// the processing goes through as usual - the middleware does nothing.
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

// [routes] are defined externaly in [routes.jsx]
render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
