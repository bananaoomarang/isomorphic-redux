import { Store } from 'flummox';
import Immutable from 'immutable';

class MessageStore extends Store {
  constructor(flux) {
    super();

    const msgActionIds = flux.getActionIds('messages');
    this.register(msgActionIds.createMessage, this.handleNewMessage);
    this.register(msgActionIds.deleteMessage, this.handleDeleteMessage);
    this.register(msgActionIds.editMessage,   this.handleEditMessage);

    this.state = {
      messages: new Immutable.List()
    };
  }

  handleNewMessage(msg) {
    msg.editing = false;

    this.setState({
      messages: this.state.messages.concat(msg)
    });
  }

  handleEditMessage(msg) {
    this.setState({
      messages: this.state.messages.set(msg.id, msg)
    });
  }

  handleDeleteMessage(id) {
    this.setState({
      messages: this.state.messages.delete(id)
    });
  }

  getMessages() {
    return this.state.messages;
  }
}

export default MessageStore;
