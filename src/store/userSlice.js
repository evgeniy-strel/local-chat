import { createSlice } from '@reduxjs/toolkit';
import { addRoom } from './roomSlice';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    active: undefined,
    error: undefined,
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
    joinUserToRoom(state, { payload: { userName, roomName, allRooms } }) {
      const users = JSON.parse(localStorage.getItem('users'));
      if (!allRooms.map((room) => room.name.toLowerCase()).includes(roomName.toLowerCase())) {
        state.error = `Комнаты с названием "${roomName}" не существует`;
        return;
      }

      const updateUsers = users.map((user) => {
        if (user.name.toLowerCase() != userName.toLowerCase()) {
          return user;
        } else if (user.rooms.map((room) => room.toLowerCase()).includes(roomName.toLowerCase())) {
          state.error = `Вы уже состоите в комнате "${roomName}"`;
          return user;
        }

        return { ...user, rooms: [...user.rooms, roomName] };
      });
      state.users = updateUsers;
      state.active.rooms.push(roomName);
      localStorage.setItem('users', JSON.stringify(updateUsers));
    },
    logout(state, action) {
      state.active = undefined;
      state.error = undefined;
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
