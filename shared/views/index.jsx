import React, { PropTypes } from 'react';

class AppView extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object.isRequired
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

export default AppView;
