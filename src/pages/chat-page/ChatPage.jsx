import React from 'react';
import { Col, Row } from 'antd';
import ChatHeader from '../../components/chat/chat-header/ChatHeader';
import ChatMessages from '../../components/chat/chat-messages/ChatMessages';
import ChatRooms from '../../components/chat/chat-rooms/ChatRooms';
import ChatWriteForm from '../../components/chat/chat-write-form/ChatWriteForm';
import './ChatPage.scss';

const users = ['John', 'Rick', 'Igor', 'Evgeniy'];

const strangerMessages = [
  'The number of cells to offset Col from the left',
  'Raster order',
  'The number of cells that raster is moved to the left',
  'The number of cells that raster is moved to the right',
];

const rooms = [
  'Lupe frisco',
  'Clarck Kent',
  'Bill Gates',
  'Ilon Mask',
  'Friends',
];

const ChatPage = ({ userName }) => {
  const [modalJoinOpen, setModalJoinOpen] = React.useState(false);
  const [modalCreateOpen, setModalCreateOpen] = React.useState(false);
  const [roomActive, setRoomActive] = React.useState(rooms[0]);

  return (
    <div className='container container-big my-chats'>
      <ChatHeader
        userName={userName}
        modalJoinOpen={modalCreateOpen}
        modalCreateOpen={modalCreateOpen}
        setModalJoinOpen={setModalJoinOpen}
        setModalCreateOpen={setModalCreateOpen}
      />
      <Row className='content'>
        <ChatRooms
          rooms={rooms}
          modalJoinOpen={modalCreateOpen}
          modalCreateOpen={modalCreateOpen}
          roomActive={roomActive}
          setModalJoinOpen={setModalJoinOpen}
          setModalCreateOpen={setModalCreateOpen}
          setRoomActive={setRoomActive}
        />
        <Col md={16}>
          <main>
            <div className='title-room'>{roomActive}</div>
            <ChatMessages messages={strangerMessages} />
            <ChatWriteForm />
          </main>
        </Col>
      </Row>
    </div>
  );
};

export default ChatPage;
