import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';


function ChatWidget() {

  React.useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div className="ChatWidget">
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}

export default ChatWidget;
