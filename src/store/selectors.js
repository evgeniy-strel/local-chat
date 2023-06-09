export const getUserName = (state) => state.users?.active?.name ?? '';
export const getUserRooms = (state) => {
  const rooms = getRooms(state) ?? [];
  return rooms.filter((room) => state.users?.active?.rooms?.includes(room?.name));
};
export const getErrorRooms = (state) => state.rooms.error;
export const getErrorUser = (state) => state.users.error;
export const getRooms = (state) => state.rooms.rooms;
export const getRoomActive = (state) => state.rooms?.active;
