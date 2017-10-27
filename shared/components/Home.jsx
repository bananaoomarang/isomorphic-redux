import React, { Component , PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';

class Home extends Component {

  // using React's type checking ... defining data types of the properties
  static propTypes = {
    todos:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  //  the [needs] property is used in [fetchComponentData]
  static needs = [
    TodoActions.getTodos
  ];

  render() {
    const { todos, dispatch } = this.props;

    // [bindActionCreators] binds each of the action from [TodoActions] to [dispatch]
    // by creating a new function, which dispatches the given action.
    // This is done so that "dumb" components don't have access to [dispatch].
    // Alternatively we could use a [mapStateToProps] function (listed in the commet below)
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

// We don't need [mapDispatchToActions], since it's done by [bindActionCreators]
// ... it's listed here in ordere to clarify what [bindActionCreators] does:
//
// const mapDispatchToActions = (dispatch, ownProps) => ({
//   getTodos: () =>         { dispatch(TodoActions.getTodos());         },
//   createTodo: (text) =>   { dispatch(TodoActions.createTodo(text));   },
//   editTodo: (id, text) => { dispatch(TodoActions.editTodo(id, text)); },
//   deleteTodo: (id) =>     { dispatch(TodoActions.deleteTodo(id));     }
// });


// connecting the <Home> component to the state and exporting
// the connected version of the component
export default connect(state => ({ todos: state.todos }))(Home)
