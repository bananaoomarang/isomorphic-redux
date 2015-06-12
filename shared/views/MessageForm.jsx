import React from 'react';

class MessageForm extends React.Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    var msg = this.refs['message-input'].getDOMNode().value;

    this.props.flux.getActions('messages').createMessage(msg);

    this.refs['message-input'].getDOMNode().value = '';
  }

  render() {
    return (
      <div>
        <input type="text" name="text" placeholder="type message" id="message-input" ref="message-input" />
        <input type="submit" name="form-submit" value="OK!" onClick={this.handleFormSubmit} />
      </div>
    );
  }
}

export default MessageForm;
