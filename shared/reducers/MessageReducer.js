import Immutable from 'immutable';

let defaultState = new Immutable.List();

export default function messageStore(state = defaultState, action) {
  switch(action.type) {
    case 'CREATE_MSG':
      return state.concat(action);
    case 'EDIT_MSG':
      return state.set(action.id, action);
    case 'DELETE_MSG':
      return state.delete(action.id);
    default:
      return state;
  }
}
