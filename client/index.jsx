import React               from 'react';
import { Router }          from 'react-router';
import { history }         from 'react-router/lib/BrowserHistory';
import { Provider }        from 'react-redux';
import { fromJS }          from 'immutable';
import * as reducers       from 'reducers';
import routes              from 'routes';
import promiseMiddleware   from 'lib/promiseMiddleware';
import immutifyState       from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(reducers);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
