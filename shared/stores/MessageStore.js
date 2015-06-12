import { Store } from 'flummox';

class MessageStore extends Store {
  constructor(flux) {
    super();

    const msgActionIds = flux.getActionIds('messages');
    this.register(msgActionIds.createMessage, this.handleNewMessage);

    this.state = {
      messages: []
    };
  }

  handleNewMessage(msg) {
    this.setState({
      messages: this.state.messages.concat([msg])
    });
  }

  getMessages() {
    return this.state.messages;
  }
}

export default MessageStore;
