import React from 'react';
import FluxComponent from 'flummox/component';
import MessageView from './Messages';
import MessageForm from './MessageForm';

class AppView extends React.Component {
  render() {
    return (
      <FluxComponent flux={this.props.flux}>
        <title>Flummox Demo</title>

        <h1>List:</h1>

        <MessageView />
        <MessageForm />
      </FluxComponent>
    );
  }
}

export default AppView;
