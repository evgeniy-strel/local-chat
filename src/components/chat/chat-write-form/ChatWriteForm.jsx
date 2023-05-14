import { PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import React from 'react';
import './ChatWriteForm.scss';
import { Form, Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToRoom } from '../../../store/roomSlice';
import { getUserName } from '../../../store/selectors';

const ChatWriteForm = ({ selectedImage, setSelectedImage }) => {
  const [messageText, setMessageText] = React.useState('');
  const [isShownEmojiPicker, setIsShownEmojiPicker] = React.useState(false);
  const userName = useSelector((state) => getUserName(state));
  const dispatch = useDispatch();

  const addMessage = () => {
    if (!messageText) return;
    console.log(messageText);
    dispatch(addMessageToRoom({ userName, messageText }));
    setMessageText('');
  };

  const changeMessageText = (e) => {
    setMessageText(e.target.value);
  };

  const addFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const result = reader.result;
      dispatch(addMessageToRoom({ userName, messageText: result }));
    };
    reader.onerror = function (error) {
      alert('Произошла ошибка загрузки файла: ', error);
    };

    console.log(file);
  };

  const onClickEmojiIcon = () => {
    setIsShownEmojiPicker((value) => !value);
  };

  const handleEmojiClick = (emoji) => {
    setMessageText((text) => text.concat('', emoji.emoji));
  };

  return (
    <div className="write-form">
      <div className="clip icon">
        <input
          type="file"
          name="file"
          id="image"
          style={{ display: 'none' }}
          onChange={(e) => {
            addFile(e);
          }}
        />
        <label for="image">
          <PaperClipOutlined />
        </label>
      </div>
      <div className="text">
        <Input
          placeholder="Введите текст..."
          size="medium"
          value={messageText}
          onChange={changeMessageText}
          onPressEnter={addMessage}
        />
      </div>

      <div className="emoji icon">
        {isShownEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <SmileOutlined onClick={onClickEmojiIcon} className="emoji-icon" />
      </div>
      <div className="send icon">
        <SendOutlined onClick={addMessage} />
      </div>
    </div>
  );
};

export default ChatWriteForm;
