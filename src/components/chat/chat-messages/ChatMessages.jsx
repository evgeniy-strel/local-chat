import React from 'react';
import './ChatMessages.scss';
import { Avatar, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { getRoomActive } from '../../../store/selectors';

const ChatMessages = () => {
  const messages = useSelector((state) => getRoomActive(state))?.messages;

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
        <div key={index} className="message">
          <div className="avatar-message-flex">
            <div>
              <Avatar className="user-avatar" size="large">
                {message.userName[0]}
              </Avatar>
            </div>
            <div className="user-name-text">
              <div className="user-name">{message?.userName}</div>
              <div className="text">{message?.text}</div>
            </div>
          </div>
          <div className="date">{getFormattedDate(message?.date)}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
