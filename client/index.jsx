import React                            from 'react';
import { Router }                       from 'react-router';
import { history }                      from 'react-router/lib/BrowserHistory';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from '../shared/reducers';
import routes                           from '../shared/routes';
import  immutifyState                   from 'lib/immutifyState';

const initialState = immutifyState(window.__INITIAL_DATA__);

const reducer = combineReducers(reducers);
const store   = createStore(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);

