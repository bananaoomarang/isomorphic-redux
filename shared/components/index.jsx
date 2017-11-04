import React, { PropTypes } from 'react';

export default class MainView extends React.Component {
  
  // using React's type checking ... defining data types of the properties
  static propTypes = {
    children: PropTypes.object
  };

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
