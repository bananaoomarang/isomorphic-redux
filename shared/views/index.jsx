import React from 'react';
import FluxComponent from 'flummox/component';
import AppFlux from '../AppFlux';
import MessageView from './Messages';
import MessageForm from './MessageForm';

class AppView extends React.Component {
  render() {
    return (
      <div>
        <title>Flummox Demo</title>

        { /* Flummox top component wrapped in this to wire 'flux' through */ }

        <FluxComponent flux={this.props.flux}>

          <h1>List:</h1>

          <MessageView />
          <MessageForm />
        </FluxComponent>

        { /* Begin to render on the frontend */ }

        <script type="application/javascript" src="/bundle.js"></script>
      </div>
    );
  }
}

AppView.propTypes = {
  flux: React.PropTypes.instanceOf(AppFlux).isRequired
};

export default AppView;
