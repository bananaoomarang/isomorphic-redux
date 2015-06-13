import { Actions } from 'flummox';

class MessageActions extends Actions {
  createMessage(msg) {
    return {
      text: msg,
      date: Date.now()
    };
  }

  editMessage(id, text) {
    return {
      id,
      text,
      date: Date.now()
    };
  }

  deleteMessage(id) {
    return id;
  }
}

export default MessageActions;
