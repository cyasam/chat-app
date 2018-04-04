import io from 'socket.io-client';

export const CREATE_SOCKET = 'CREATE_SOCKET';
export const REMOVE_SOCKET = 'REMOVE_SOCKET';

export const createSocket = {
  type: CREATE_SOCKET,
  payload: io('http://192.168.1.13:4567', {
    autoConnect: false
  })
};

export const removeSocket = {
  type: REMOVE_SOCKET,
  payload: {}
};
