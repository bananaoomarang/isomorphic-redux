import React from 'react';
import FluxComponent from 'flummox/component';
import MessageView from './MessageView';
import MessageForm from './MessageForm';

class AppView extends React.Component {
  render() {
    return (
      <FluxComponent flux={this.props.flux}>
        <h1>All about my star</h1>
        <MessageView />
        <MessageForm />
      </FluxComponent>
    );
  }
}

export default AppView;
