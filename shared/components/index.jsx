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
      <div>

        <title>Redux Demo</title>

        {this.props.children}

        <script type="application/javascript" src="/bundle.js"></script>
      </div>
    );
  }
}
