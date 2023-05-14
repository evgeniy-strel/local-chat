import { createSlice } from '@reduxjs/toolkit';
import { addRoom } from './roomSlice';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    active: undefined,
  },
  reducers: {
    loginUser(state, action) {
      const userName = action.payload;
      const users = JSON.parse(localStorage.getItem('users')) ?? [];
      state.users = users;
      const activeUser = users.find((user) => user.name.toLowerCase() === userName.toLowerCase());
      if (!activeUser) {
        const newUser = {
          name: userName,
          rooms: [],
        };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        state.active = newUser;
        state.users.push(newUser);
      } else {
        state.active = activeUser;
      }
    },
    joinUserToRoom(state, { payload: { userName, roomName } }) {
      const users = JSON.parse(localStorage.getItem('users'));
      const updateUsers = users.map((user) => {
        if (user.name.toLowerCase() != userName.toLowerCase() || user.rooms.includes(roomName))
          return user;
        return { ...user, rooms: [...user.rooms, roomName] };
      });
      state.users = updateUsers;
      state.active.rooms.push(roomName);
      localStorage.setItem('users', JSON.stringify(updateUsers));
    },
    logout(state, action) {
      state.active = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRoom, (state, { payload: { userName, roomName } }) => {
      if (state.active.rooms.map((room) => room.toLowerCase()).includes(roomName.toLowerCase()))
        return;

      const users = JSON.parse(localStorage.getItem('users'));
      console.log(roomName, userName);
      const updateUsers = users.map((user) => {
        if (user.name !== userName) return user;
        return { ...user, rooms: [...user.rooms, roomName] };
      });
      console.log(updateUsers);
      localStorage.setItem('users', JSON.stringify(updateUsers));
      state.users = updateUsers;
      state.active.rooms.push(roomName);
    });
  },
});

export const { loginUser, logout, joinUserToRoom } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
