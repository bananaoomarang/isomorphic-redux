import React from 'react';
import connectToStores from 'flummox/connect';
import MessageList from './List';

class MessageView extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <MessageList messages={messages} />
    );
  }
}

MessageView = connectToStores(MessageView, {
  messages: store => ({
    messages: store.getMessages()
  })
});

export default MessageView;
