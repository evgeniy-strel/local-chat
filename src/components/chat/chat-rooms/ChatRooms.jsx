import React, { useReducer } from 'react';
import './ChatRooms.scss';
import { Input, Avatar, Col, Modal, Form, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomActive, getRooms, getUserName, getUserRooms } from '../../../store/selectors';
import { addRoom, initRooms, setRoomActive } from '../../../store/roomSlice';
import { joinUserToRoom } from '../../../store/userSlice';

const ChatRooms = ({ modalJoinOpen, modalCreateOpen, setModalCreateOpen, setModalJoinOpen }) => {
  const dispatch = useDispatch();
  const userRooms = useSelector((state) => getUserRooms(state));
  const roomActive = useSelector((state) => getRoomActive(state));

  const [searchRoomName, setSearchRoomName] = React.useState('');
  const userName = useSelector((state) => getUserName(state));

  const [formAdd] = Form.useForm();
  const [formJoin] = Form.useForm();

  const clickRoom = (room) => {
    dispatch(setRoomActive(room));
  };

  const addRoomLocal = ({ roomName }) => {
    const answer = dispatch(addRoom({ roomName, userName }));
    console.log(answer);
    setModalCreateOpen(false);
    formAdd.resetFields();
  };

  const joinRoomLocal = ({ roomName }) => {
    dispatch(joinUserToRoom({ roomName, userName }));
    setModalJoinOpen(false);
    formJoin.resetFields();
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

  React.useEffect(() => {
    dispatch(initRooms());
  }, []);

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
            {userRooms
              .filter((room) => room?.name?.toLowerCase().includes(searchRoomName.toLowerCase()))
              .map((room) => (
                <li
                  key={room?.name}
                  className={room?.name === roomActive?.name ? 'room active' : `room`}
                  onClick={() => clickRoom(room)}>
                  <Avatar className="room-avatar" size="large">
                    {room?.name[0]}
                  </Avatar>
                  <span className="title">{room?.name}</span>
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
        <Form form={formAdd} name="addRoom" onFinish={addRoomLocal}>
          <p>Введите название новой комнаты:</p>
          <Form.Item
            name="roomName"
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
        <Form form={formJoin} name="joinRoom" onFinish={joinRoomLocal}>
          <p>Введите название комнаты:</p>
          <Form.Item
            name="roomName"
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
