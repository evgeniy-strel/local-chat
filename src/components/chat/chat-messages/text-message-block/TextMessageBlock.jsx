import React from 'react';

const TextMessageBlock = ({ message }) => {
  const replyMessage = message?.replyMessage;

  return (
    <div className="text-block">
      {replyMessage && (
        <div className="reply-block">
          <div className="user-name">{replyMessage.userName}</div>
          <div className="text">
            {replyMessage.text.slice(0, 5) === 'data:' ? (
              <img className="reply-img" src={replyMessage.text} alt="not found" />
            ) : (
              <div className="input-block">{replyMessage.text}</div>
            )}
          </div>
        </div>
      )}
      {message?.text?.slice(0, 5) === 'data:' ? (
        <img src={message?.text} alt="not found" />
      ) : (
        <div className="input-block">{message?.text}</div>
      )}
    </div>
  );
};

export default TextMessageBlock;
