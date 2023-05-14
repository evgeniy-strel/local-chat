import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import ChatPage from './pages/chat-page/ChatPage';
import './style.scss';

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my_chats" element={<ChatPage userName={'userName'} />} />
      </Routes>
    </div>
  );
}

export default App;
