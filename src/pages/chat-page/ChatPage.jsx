import React from 'react';
import { Col, Empty, Row, notification } from 'antd';
import ChatHeader from '../../components/chat/chat-header/ChatHeader';
import ChatMessages from '../../components/chat/chat-messages/ChatMessages';
import ChatRooms from '../../components/chat/chat-rooms/ChatRooms';
import ChatWriteForm from '../../components/chat/chat-write-form/ChatWriteForm';
import './ChatPage.scss';
import { useSelector } from 'react-redux';
import { getErrorRooms, getErrorUser, getRoomActive } from '../../store/selectors';

const ChatPage = ({ userName }) => {
  const [api, contextHolder] = notification.useNotification();

  const [modalJoinOpen, setModalJoinOpen] = React.useState(false);
  const [modalCreateOpen, setModalCreateOpen] = React.useState(false);
  const roomActive = useSelector((state) => getRoomActive(state));

  const errorsRoom = useSelector((state) => getErrorRooms(state));
  const errorsUser = useSelector((state) => getErrorUser(state));

  const [selectedImage, setSelectedImage] = React.useState();

  React.useEffect(() => {
    if (errorsRoom)
      api['error']({
        message: 'Ошибка',
        description: errorsRoom,
      });
  }, [errorsRoom]);

  React.useEffect(() => {
    if (errorsUser)
      api['error']({
        message: 'Ошибка',
        description: errorsUser,
      });
  }, [errorsUser]);

  return (
    <>
      {contextHolder}
      <div className="container container-big my-chats">
        <ChatHeader
          userName={userName}
          modalJoinOpen={modalJoinOpen}
          modalCreateOpen={modalCreateOpen}
          setModalJoinOpen={setModalJoinOpen}
          setModalCreateOpen={setModalCreateOpen}
        />
        <Row className="content">
          <ChatRooms
            modalJoinOpen={modalJoinOpen}
            modalCreateOpen={modalCreateOpen}
            setModalJoinOpen={setModalJoinOpen}
            setModalCreateOpen={setModalCreateOpen}
          />
          <Col md={16}>
            {roomActive ? (
              <main>
                <div className="title-room">{roomActive?.name}</div>
                <ChatMessages image={selectedImage} />
                <ChatWriteForm selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              </main>
            ) : (
              <div className="empty-block">
                <Empty description="Выберите комнату для просмотра сообщений" />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChatPage;
