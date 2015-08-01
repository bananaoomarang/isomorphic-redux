import Immutable from 'immutable';

let defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'CREATE_TODO':
      return state.concat(action);
    case 'EDIT_TODO':
      return state.set(action.id, action);
    case 'DELETE_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}
