import React, { PropTypes } from 'react';

export default class TodosForm extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  }

  handleSubmit = () => {
    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="type todo" ref="todo-input" />
        <input type="submit" value="OK!" onClick={this.handleSubmit} />
      </div>
    );
  }
}
