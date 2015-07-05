import React, { PropTypes } from 'react';

class MessageForm extends React.Component {
  static propTypes = {
    createMessage: PropTypes.func.isRequired
  }

  handleFormSubmit = () => {
    let node = this.refs['message-input'].getDOMNode();

    this.props.createMessage(node.value);

    node.value = '';
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
