import React         from 'react';
import MessageView   from './MessageView';
import MessageForm   from './MessageForm';

var AppView = {
  render() {
    return (
      <div>
        <h1>List:</h1>

        <MessageView />
        <MessageForm />
      </div>
    );
  }
};

export default React.createClass(AppView);
