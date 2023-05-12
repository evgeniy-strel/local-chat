import {
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import React from 'react';
import './ChatWriteForm.scss';
import { Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';

const ChatWriteForm = () => {
  const [messageText, setMessageText] = React.useState('');
  const [isShownEmojiPicker, setIsShownEmojiPicker] = React.useState(false);

  const changeMessageText = (e) => {
    setMessageText(e.target.value);
  };

  const onClickEmojiIcon = () => {
    setIsShownEmojiPicker((value) => !value);
  };

  const handleEmojiClick = (emoji) => {
    setMessageText((text) => text.concat('', emoji.emoji));
  };

  return (
    <div className='write-form'>
      <div className='clip icon'>
        <PaperClipOutlined />
      </div>
      <div className='text'>
        <Input
          placeholder='Введите текст...'
          size='medium'
          value={messageText}
          onChange={changeMessageText}
        />
      </div>
      <div className='emoji icon'>
        {isShownEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <SmileOutlined onClick={onClickEmojiIcon} />
      </div>
      <div className='send icon'>
        <SendOutlined />
      </div>
    </div>
  );
};

export default ChatWriteForm;
