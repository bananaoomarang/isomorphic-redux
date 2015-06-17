import React         from 'react';
import Router        from 'react-router';
import FluxComponent from 'flummox/component';
import AppFlux       from  '../shared/AppFlux';
import routes        from '../shared/routes';

const flux = new AppFlux();

Router.run(routes, function (Handler, state) {
  React.render(
    <FluxComponent flux={flux}>
      <Handler {...state} />
    </FluxComponent>,
    document.body
  );
});

