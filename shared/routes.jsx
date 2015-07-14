import React                   from 'react';
import { DefaultRoute, Route } from 'react-router';
import App                     from 'views/index';
import Home                    from 'views/Home';

export default (
  <Route name="app" component={App} path="/">
    <Route component={Home} path="home" />
  </Route>
);
