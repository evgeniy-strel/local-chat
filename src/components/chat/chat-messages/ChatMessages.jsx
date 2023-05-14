import React from 'react';
import './ChatMessages.scss';
import { Avatar, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { getRoomActive, getUserName } from '../../../store/selectors';

const ChatMessages = ({ image }) => {
  const messages = useSelector((state) => getRoomActive(state))?.messages;
  const userName = useSelector((state) => getUserName(state));

  if (!messages?.length) {
    return <Empty description="Напишите первое сообщение" className="empty-block" />;
  }

  const getFormattedDate = (unix) => {
    const date = new Date(unix);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dateNumber = addZeroToDate(date.getDate());
    const hours = addZeroToDate(date.getHours());
    const minutes = addZeroToDate(date.getMinutes());
    return `${dateNumber} ${month} ${year} ${hours}:${minutes}`;
  };

  const addZeroToDate = (date) => {
    return date >= 10 ? date : `0${date}`;
  };

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message?.userName === userName ? 'my-message' : ''}`}>
          <div className="avatar-message-flex">
            <div>
              <Avatar className="user-avatar" size="large">
                {message.userName[0]}
              </Avatar>
            </div>
            <div className="user-name-text">
              <div className="user-name">{message?.userName}</div>
              <div className="text">
                {message?.text?.slice(0, 5) === 'data:' ? (
                  <img src={message?.text} alt="not found" />
                ) : (
                  message?.text
                )}
              </div>
            </div>
          </div>
          <div className="date">{getFormattedDate(message?.date)}</div>
        </div>
      ))}
      {image && (
        <div className="message">
          <div className="avatar-message-flex">
            <div>
              <Avatar className="user-avatar" size="large">
                {'S'}
              </Avatar>
            </div>
            <div className="user-name-text">
              <div className="user-name">{'Andrey'}</div>
              <div className="text">
                <img src={URL.createObjectURL(image)} width={250} height={200} alt="not found" />
              </div>
            </div>
          </div>
          <div className="date">5</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
