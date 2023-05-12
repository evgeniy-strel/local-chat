import React from 'react';
import './LoginPage.scss';
import { Row, Col, Input, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ userName, setUserName }) => {
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };

  const handleLogin = () => {
    navigate('/my_chats');
  };

  React.useEffect(() => {
    setUserName('');
  }, []);

  return (
    <div className='container container-small'>
      <div className='login-form'>
        <div>
          <p>Введите имя:</p>
          <Input
            size='large'
            value={userName}
            maxLength={20}
            onChange={handleChangeName}
          />
          <Button
            type='primary'
            icon={<LoginOutlined />}
            size='large'
            className='login-button'
            onClick={handleLogin}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
