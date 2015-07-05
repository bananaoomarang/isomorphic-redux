import { CREATE_MSG, EDIT_MSG, DELETE_MSG } from '../constants/actions';

export function createMessage(msg) {
  return {
    type: CREATE_MSG,
    text: msg,
    date: Date.now()
  };
}

export function editMessage(id, text) {
  return {
    type: EDIT_MSG,
    id,
    text,
    date: Date.now()
  };
}

export function deleteMessage(id) {
  return {
    type: DELETE_MSG,
    id
  };
}
