import React           from 'react';
import Router          from 'react-router';
import { createRedux } from 'redux';
import { Provider }    from 'redux/react';
import routes          from '../shared/routes';
import * as stores from '../shared/stores';

const redux = createRedux(stores);

Router.run(routes, function (Handler, state) {
  React.render(
    <Provider redux={redux}>
      {() =>
        <Handler {...state} />
      }
    </Provider>,
    document.body
  );
});

