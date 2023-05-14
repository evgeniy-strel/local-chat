import { PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import React from 'react';
import './ChatWriteForm.scss';
import { Form, Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToRoom, setError } from '../../../store/roomSlice';
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

    const errorFileFormat = getErrorFileFormat(file);
    if (errorFileFormat) {
      dispatch(setError({ error: errorFileFormat }));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      dispatch(addMessageToRoom({ userName, messageText: reader.result }));
    };
    reader.onerror = function (error) {
      alert('Произошла ошибка загрузки файла: ', error);
    };
  };

  const getErrorFileFormat = (file) => {
    let error = null;
    if (!['image/gif', 'image/png', 'image/jpeg', 'image/webp'].includes(file.type))
      error = `Расширение файла "${file.name}" не поддерживается. Загрузите картинку в формате gif, jpeg, png или webp`;
    else if (file.size >= 1048576) error = `Размер файла "${file.name}" должен быть менее 1 МБ`;

    return error;
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
