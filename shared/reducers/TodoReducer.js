import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    // 'GET_TODOS' action is fired by the promise middleware after
    // the async operation (server request) was done and the promise resolved
    // Action contains the payload retrived from the server
    case 'GET_TODOS':
      return new Immutable.List(action.res.data);
    // 'CREATE_TODO' action is fired by the promise middleware after
    // the async operation was done (data entered by user is saved on server)
    // and the promise resolved. Action contains the text entered by the user
    // in the popup window's form
    case 'CREATE_TODO':
      return state.concat(action.res.data.text);
    case 'EDIT_TODO':
      return state.set(action.id, action.text);
    case 'DELETE_TODO':
      return state.delete(action.id);
    default:
      return state;
  }
}