import React from 'react';
import './ChatRooms.scss';
import { Input, Avatar, Col, Modal, Form, Button } from 'antd';
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
  const [searchRoomName, setSearchRoomName] = React.useState('');
  const [formAdd] = Form.useForm();
  const [formJoin] = Form.useForm();

  const clickRoom = (room) => {
    setRoomActive(room);
  };

  const addRoom = ({ nameRoom }) => {
    rooms.push(nameRoom);
    setRoomActive(rooms[rooms.length - 1]);
    setModalCreateOpen(false);
    formAdd.resetFields();
  };

  const onChangeSearchRoom = (e) => {
    setSearchRoomName(e.target.value);
  };

  const closeModalCreate = () => {
    setModalCreateOpen(false);
    formAdd.resetFields();
  };

  const closeModalJoin = () => {
    setModalJoinOpen(false);
    formJoin.resetFields();
  };

  console.log(modalCreateOpen, modalJoinOpen);

  return (
    <>
      <Col md={8}>
        <aside>
          <Input
            size="large"
            placeholder="Введите нужную комнату..."
            onChange={onChangeSearchRoom}
            value={searchRoomName}
            prefix={<SearchOutlined />}
          />
          <ul className="rooms">
            {rooms
              .filter((room) => room.toLowerCase().includes(searchRoomName.toLowerCase()))
              .map((room) => (
                <li
                  key={room}
                  className={room === roomActive ? 'room active' : `room`}
                  onClick={() => clickRoom(room)}>
                  <Avatar className="room-avatar" size="large">
                    {room[0]}
                  </Avatar>
                  <span className="title">{room}</span>
                </li>
              ))}
          </ul>
        </aside>
      </Col>
      <Modal
        centered
        open={modalCreateOpen}
        footer={null}
        className="modal-create-room"
        onCancel={closeModalCreate}>
        <Form
          form={formAdd}
          name="addRoom"
          onFinish={addRoom}
          onFinishFailed={() => console.log('fail')}>
          <p>Введите название новой комнаты:</p>
          <Form.Item
            name="nameRoom"
            rules={[{ required: true, message: 'Вы не ввели название комнаты' }]}
            className="form-item">
            <Input size="medium" minLength={4} maxLength={20} />
          </Form.Item>
          <Form.Item className="form-item">
            <Button type="primary" size="medium" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        centered
        open={modalJoinOpen}
        footer={null}
        className="modal-join-room"
        onCancel={closeModalJoin}>
        <Form form={formJoin} name="joinRoom" onFinish={() => {}}>
          <p>Введите название комнаты:</p>
          <Form.Item
            name="joinRoom"
            rules={[{ required: true, message: 'Вы не ввели название комнаты' }]}
            className="form-item">
            <Input size="medium" minLength={4} maxLength={20} />
          </Form.Item>
          <Form.Item className="form-item">
            <Button type="primary" size="medium" htmlType="submit">
              Присоединиться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChatRooms;
