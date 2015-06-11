import React from 'react';
import FluxComponent from 'flummox/component';
import MessageList from './MessageList';

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    props.flux.getActions('messages').createMessage('Hello');
  }

  render() {
    var stores = {
      messages: store => ({
        messages: store.getMessages()
      })
    }

    return (
      <FluxComponent connectToStores={stores}>
        <MessageList />
      </FluxComponent>
    );
  }
}

export default MessageView;
