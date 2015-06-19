import React           from 'react';
import connectToStores from 'flummox/connect';
import Immutable       from 'immutable';
import AppFlux         from '../AppFlux';

var stores = {
  messages: store => ({
    messages: store.getMessages()
  })
};

var MessageView = {
  propTypes: {
    messages: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  contextTypes: {
    flux: React.PropTypes.instanceOf(AppFlux).isRequired
  },

  handleDelete(e) {
    const id = Number(e.target.dataset.id);

    this.context.flux
      .getActions('messages')
      .deleteMessage(id);
  },

  handleEdit(e) {
    const id         = Number(e.target.dataset.id);
    const currentVal = this.props.messages.get(id).text;

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.context.flux
      .getActions('messages')
      .editMessage(id, text);
  },

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    return (
      <div id="message-list">
        {
          this.props.messages.map(function (msg, index) {
            return (
              <div style={btnStyle} key={index}>
                <span>{msg.text}</span>
                <button style={btnStyle} data-id={index} onClick={this.handleDelete}>X</button>
                <button style={btnStyle} data-id={index} onClick={this.handleEdit}>Edit</button>
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
};

export default connectToStores(
  React.createClass(MessageView),
  stores
);
