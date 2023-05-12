import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import ChatPage from './pages/chat-page/ChatPage';
import './style.scss';

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <div className='wrapper'>
      <Routes>
        <Route
          path='/login'
          element={<LoginPage userName={userName} setUserName={setUserName} />}
        />
        <Route path='/my_chats' element={<ChatPage userName={userName} />} />
      </Routes>
    </div>
  );
}

export default App;
