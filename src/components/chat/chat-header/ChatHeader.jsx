import React from 'react';
import './ChatHeader.scss';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FolderAddOutlined,
  LogoutOutlined,
  RightCircleOutlined,
  WechatOutlined,
} from '@ant-design/icons';

const ChatHeader = ({
  userName,
  modalJoinOpen,
  modalCreateOpen,
  setModalJoinOpen,
  setModalCreateOpen,
}) => {
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

  const [navbarTitleActive, setNavbarTitleActive] = React.useState(
    navbarTitles[0]
  );

  const navigate = useNavigate();

  const clickNavbarTitle = (navbar) => {
    setNavbarTitleActive(navbar);
    navbar?.onClick();
  };

  const logout = () => {
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
        <ul className='navbar-titles'>
          {navbarTitles.map((navbar) => (
            <li
              key={navbar.text}
              className={
                navbar?.text === navbarTitleActive?.text ? 'active' : ''
              }
              onClick={() => clickNavbarTitle(navbar)}>
              <span className='icon'>{navbar.icon}</span>
              <span className='title'>{navbar.text}</span>
            </li>
          ))}
        </ul>
        <div className='account-user'>
          <Avatar size='large'>{userName[0]}</Avatar>
          <span>{userName}</span>
          <LogoutOutlined className='logout-button' onClick={logout} />
        </div>
      </header>
    </>
  );
};

export default ChatHeader;
