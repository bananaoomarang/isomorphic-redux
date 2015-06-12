import Flux from 'flummox';
import MessageActions from './actions/MessageActions';
import MessageStore from './stores/MessageStore';

class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('messages', MessageActions);

    this.createStore('messages', MessageStore, this);
  }
}

export default AppFlux;
