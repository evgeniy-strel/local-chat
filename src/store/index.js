import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice';
import { roomsReducer } from './roomSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    rooms: roomsReducer,
  },
});
