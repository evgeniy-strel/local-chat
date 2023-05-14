import React from 'react';
import { Col, Row, notification } from 'antd';
import ChatHeader from '../../components/chat/chat-header/ChatHeader';
import ChatMessages from '../../components/chat/chat-messages/ChatMessages';
import ChatRooms from '../../components/chat/chat-rooms/ChatRooms';
import ChatWriteForm from '../../components/chat/chat-write-form/ChatWriteForm';
import './ChatPage.scss';
import { useSelector } from 'react-redux';
import { getErrorRooms, getErrorUser, getRoomActive } from '../../store/selectors';

const users = ['John', 'Rick', 'Igor', 'Evgeniy'];

const strangerMessages = [
  'The number of cells to offset Col from the left',
  'Raster order',
  'The number of cells that raster is moved to the left',
  'The number of cells that raster is moved to the right',
];

const ChatPage = ({ userName }) => {
  const [api, contextHolder] = notification.useNotification();

  const [modalJoinOpen, setModalJoinOpen] = React.useState(false);
  const [modalCreateOpen, setModalCreateOpen] = React.useState(false);
  const roomActive = useSelector((state) => getRoomActive(state));

  const errorsRoom = useSelector((state) => getErrorRooms(state));
  const errorsUser = useSelector((state) => getErrorUser(state));

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
            <main>
              <div className="title-room">{roomActive?.name}</div>
              <ChatMessages messages={strangerMessages} />
              <ChatWriteForm />
            </main>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChatPage;
