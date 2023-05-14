import React from 'react';
import './ChatHeader.scss';
import { Avatar, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FolderAddOutlined,
  LogoutOutlined,
  RightCircleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from './../../../store/selectors';
import { logout } from '../../../store/userSlice';

const ChatHeader = ({ modalJoinOpen, modalCreateOpen, setModalJoinOpen, setModalCreateOpen }) => {
  const navbarTitles = [
    {
      icon: <WechatOutlined />,
      text: 'Мои комнаты',
      onClick: () => {},
    },
    {
      icon: <RightCircleOutlined />,
      text: 'Присоединиться',
      onClick: () => setModalJoinOpen(true),
    },
    {
      icon: <FolderAddOutlined />,
      text: 'Создать комнату',
      onClick: () => setModalCreateOpen(true),
    },
  ];

  const userName = useSelector((state) => getUserName(state));

  const [navbarTitleActive, setNavbarTitleActive] = React.useState(navbarTitles[0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickNavbarTitle = (navbar) => {
    setNavbarTitleActive(navbar);
    navbar?.onClick();
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };

  React.useEffect(() => {
    if (!modalJoinOpen && !modalCreateOpen) {
      setNavbarTitleActive(navbarTitles[0]);
    }
  }, [modalJoinOpen, modalCreateOpen]);

  return (
    <>
      <header>
        <ul className="navbar-titles">
          {navbarTitles.map((navbar) => (
            <li
              key={navbar.text}
              className={navbar?.text === navbarTitleActive?.text ? 'active' : ''}
              onClick={() => clickNavbarTitle(navbar)}>
              <span className="icon">{navbar.icon}</span>
              <span className="title">{navbar.text}</span>
            </li>
          ))}
        </ul>
        <div className="account-user">
          <Avatar size="large">{userName[0]}</Avatar>
          <span>{userName}</span>

          <Popconfirm
            placement="top"
            title="Вы действительно хотите выйти?"
            onConfirm={logoutUser}
            okText="Да"
            cancelText="Нет">
            <LogoutOutlined className="logout-button" />
          </Popconfirm>
        </div>
      </header>
    </>
  );
};

export default ChatHeader;
