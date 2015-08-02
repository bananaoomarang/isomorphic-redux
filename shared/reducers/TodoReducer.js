import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'CREATE_TODO':
      return state.concat(action.text);
    case 'EDIT_TODO':
      return state.set(action.id, action.text);
    case 'DELETE_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}
