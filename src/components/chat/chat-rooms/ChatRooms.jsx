import React from 'react';
import './ChatRooms.scss';
import { Input, Avatar, Col, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const ChatRooms = ({
  rooms,
  roomActive,
  modalJoinOpen,
  modalCreateOpen,
  setModalCreateOpen,
  setModalJoinOpen,
  setRoomActive,
}) => {
  const [newRoomText, setNewRoomText] = React.useState('');
  const [searchRoomText, setSearchRoomText] = React.useState('');

  const clickRoom = (room) => {
    setRoomActive(room);
  };

  const addRoom = () => {
    rooms.push(newRoomText);
    setRoomActive(rooms[rooms.length - 1]);
    setNewRoomText('');
    setModalCreateOpen(false);
  };

  const onChangeRoomText = (e) => {
    setNewRoomText(e.target.value);
  };

  const onChangeSearchRoom = (e) => {
    setSearchRoomText(e.target.value);
  };

  return (
    <>
      <Col md={8}>
        <aside>
          <Input
            size='large'
            placeholder='Введите нужную комнату...'
            onChange={onChangeSearchRoom}
            value={searchRoomText}
            prefix={<SearchOutlined />}
          />
          <ul className='rooms'>
            {rooms
              .filter((room) =>
                room.toLowerCase().includes(searchRoomText.toLowerCase())
              )
              .map((room) => (
                <li
                  key={room}
                  className={room === roomActive ? 'room active' : `room`}
                  onClick={() => clickRoom(room)}>
                  <Avatar className='room-avatar' size='large'>
                    {room[0]}
                  </Avatar>
                  <span className='title'>{room}</span>
                </li>
              ))}
          </ul>
        </aside>
      </Col>
      <Modal
        title={
          <>
            <p>Введите название новой комнаты:</p>
            <Input
              size='medium'
              value={newRoomText}
              onChange={onChangeRoomText}
            />
          </>
        }
        centered
        open={modalCreateOpen}
        onOk={addRoom}
        onCancel={() => setModalCreateOpen(false)}></Modal>
    </>
  );
};

export default ChatRooms;
