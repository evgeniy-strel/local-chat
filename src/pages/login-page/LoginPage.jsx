import React from 'react';
import './LoginPage.scss';
import { Row, Col, Input, Button, Form } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = ({ userName }) => {
    dispatch(loginUser(userName));
    navigate('/my_chats');
  };

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
              <Input size="large" minLength={4} maxLength={20} />
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
