import React from 'react';
import './ChatMessages.scss';
import { Avatar } from 'antd';

const ChatMessages = ({ messages }) => {
  return (
    <div className='messages'>
      {messages.map((message, index) => (
        <div key={index} className='message'>
          <div className='avatar-message-flex'>
            <div>
              <Avatar className='user-avatar' size='large'>
                {message[0]}
              </Avatar>
            </div>
            <div className='user-name-text'>
              <div className='user-name'>Alex</div>
              <div className='text'>{message}</div>
            </div>
          </div>
          <div className='date'>05 May 15:45</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
