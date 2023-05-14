import {
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
  RetweetOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import React from 'react';
import './ChatWriteForm.scss';
import { Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToRoom, setError } from '../../../store/roomSlice';
import { getUserName } from '../../../store/selectors';

const ChatWriteForm = ({ replyMessage, setReplyMessage }) => {
  const [messageText, setMessageText] = React.useState('');
  const [isShownEmojiPicker, setIsShownEmojiPicker] = React.useState(false);
  const userName = useSelector((state) => getUserName(state));
  const dispatch = useDispatch();

  const addMessage = () => {
    if (!messageText) return;
    console.log(messageText);
    dispatch(addMessageToRoom({ userName, messageText, replyMessage }));
    setMessageText('');
    setReplyMessage(null);
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
      dispatch(addMessageToRoom({ userName, messageText: reader.result, replyMessage }));
      setMessageText('');
      setReplyMessage(null);
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
    <>
      {replyMessage && (
        <div className="reply-message">
          <div className="retweet-icon">
            <RetweetOutlined />
          </div>
          <div className="username-text">
            <div className="username">{replyMessage?.userName}</div>
            <div className="text">
              {replyMessage.text.slice(0, 5) === 'data:' ? (
                <img className="reply-img-form" src={replyMessage.text} alt="not found" />
              ) : (
                <div className="input-block">{replyMessage.text}</div>
              )}
            </div>
          </div>
          <div className="delete-reply">
            <CloseOutlined onClick={() => setReplyMessage(null)} />
          </div>
        </div>
      )}
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
    </>
  );
};

export default ChatWriteForm;
