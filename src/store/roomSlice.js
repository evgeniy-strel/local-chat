import { createSlice, current } from '@reduxjs/toolkit';
import { logout } from './userSlice';
import store from '@reduxjs/toolkit';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    active: undefined,
    error: undefined,
  },
  reducers: {
    initRooms(state, action) {
      const rooms = JSON.parse(localStorage.getItem('rooms')) ?? [];
      state.rooms = rooms;
    },
    addRoom(state, { payload: { userName, roomName } }) {
      if (state.rooms.find((room) => room.name.toLowerCase() == roomName.toLowerCase())) {
        state.error = `Комната с названием "${roomName}" уже создана. Мы присоединили вас к ней`;
        return;
      }
      const newRoom = {
        name: roomName,
        messages: [],
      };
      localStorage.setItem('rooms', JSON.stringify([...state.rooms, newRoom]));
      state.rooms.push(newRoom);
      state.active = newRoom;
    },
    setRoomActive(state, action) {
      state.active = action.payload;
    },
    addMessageToRoom(state, { payload: { userName, messageText } }) {
      const updateRoom = state.active;
      updateRoom.messages.push({
        userName,
        text: messageText,
        date: Date.now(),
      });
      state.active = updateRoom;
      const updatedRooms = state.rooms.map((room) => {
        if (room.name !== updateRoom.name) return room;
        return updateRoom;
      });
      state.rooms = updatedRooms;
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state, action) => {
      state.active = undefined;
      state.error = undefined;
    });
  },
});

export const { initRooms, addRoom, setRoomActive, addMessageToRoom } = roomsSlice.actions;

export const roomsReducer = roomsSlice.reducer;
