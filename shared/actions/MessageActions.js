import { Actions } from 'flummox';

class MessageActions extends Actions {
  createMessage(msg) {
    return {
      text: msg,
      date: Date.now()
    }
  }
}

export default MessageActions;
