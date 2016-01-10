import React, { Component , PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';

class Home extends Component {
  static propTypes = {
    todos:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
    TodoActions.getTodos
  ];

  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos}
          {...bindActionCreators(TodoActions, dispatch)} />

        <TodosForm
          {...bindActionCreators(TodoActions, dispatch)}/>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(Home)
