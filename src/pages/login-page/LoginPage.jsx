import React from 'react';
import './LoginPage.scss';
import { Row, Col, Input, Button, Form } from 'antd';
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
    <div className="container container-small">
      <div className="login-form">
        <div>
          <p>Введите имя:</p>
          <Form
            name="basic"
            onFinish={handleLogin}
            onFinishFailed={() => console.log('fail')}
            autoComplete="off">
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Вы не ввели имя' }]}
              className="form-item">
              <Input
                size="large"
                value={userName}
                minLength={4}
                maxLength={20}
                onChange={handleChangeName}
              />
            </Form.Item>
            <Form.Item className="form-item">
              <Button
                type="primary"
                icon={<LoginOutlined />}
                size="large"
                className="login-button"
                htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
