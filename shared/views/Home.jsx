import React         from 'react';
import { PropTypes } from 'react';
import MessageView   from './MessageView';
import MessageForm   from './MessageForm';
import { bindActionCreators  } from 'redux';
import * as MessageActions from '../actions/MessageActions';
import { connect } from 'redux/react';

@connect(state => ({
  messages: state.messages
}))

export default class Home extends React.Component {
  static propTypes = {
    messages: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { messages, dispatch } = this.props;

    return (
      <div>
        <h1>List:</h1>

        <MessageView messages={messages} {...bindActionCreators(MessageActions, dispatch)} />
        <MessageForm {...bindActionCreators(MessageActions, dispatch)}/>
      </div>
    );
  }
}
