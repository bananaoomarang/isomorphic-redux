import React             from 'react';
import { RouteHandler }  from 'react-router';

class AppView extends React.Component {
  render() {
    return (
      <div>

        <title>Redux Demo</title>

        <RouteHandler {...this.props} />

        <script type="application/javascript" src="/bundle.js"></script>
      </div>
    );
  }
}

export default AppView;
