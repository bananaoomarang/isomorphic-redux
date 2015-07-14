import React         from 'react';
import { PropTypes } from 'react';
import Immutable     from 'immutable';

class MessageView extends React.Component {
  static propTypes = {
    messages:      PropTypes.instanceOf(Immutable.List).isRequired,
    editMessage:   PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired
  }

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    this.props.deleteMessage(id);
  }

  handleEdit = (e) => {
    const id         = Number(e.target.dataset.id);
    const currentVal = this.props.messages.get(id).text;

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editMessage(id, text);
  }

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
}

export default MessageView;
