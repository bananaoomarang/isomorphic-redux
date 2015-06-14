import React from 'react';

var MessageForm = {
  handleFormSubmit() {
    var msg = this.refs['message-input'].getDOMNode().value;

    this.props.flux.getActions('messages').createMessage(msg);

    this.refs['message-input'].getDOMNode().value = '';
  },

  render() {
    return (
      <div>
        <input type="text" name="text" placeholder="type message" id="message-input" ref="message-input" />
        <input type="submit" name="form-submit" value="OK!" onClick={this.handleFormSubmit} />
      </div>
    );
  }
}

export default React.createClass(MessageForm);
