export function createTodo(msg) {
  return {
    type: 'CREATE_TODO',
    text: msg,
    date: Date.now()
  };
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}
