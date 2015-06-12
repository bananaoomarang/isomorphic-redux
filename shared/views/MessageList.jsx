import React from 'react';
import FluxComponent from 'flummox/component';

class MessageList extends React.Component {
  render() {
    return (
      <div id="message-list">
        {
          this.props.messages.map(function (msg, index) {
            return <p key={index}>{msg.text}</p>;
          })
        }
      </div>
    );
  }
}

export default MessageList;
