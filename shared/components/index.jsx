import React, { PropTypes } from 'react';

export default class MainView extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object
  }

  componentDidMount = () => {
    this.context.router.transitionTo('home');
  }

  render() {
    return (
      <div id="main-view">
        <h1>Todos</h1>

        <hr />

        {this.props.children}
      </div>
    );
  }
}
