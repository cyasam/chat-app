import io from 'socket.io-client';
import config from '../config';

export const CREATE_SOCKET = 'CREATE_SOCKET';
export const REMOVE_SOCKET = 'REMOVE_SOCKET';

export const createSocket = {
  type: CREATE_SOCKET,
  payload: io(config.API_URL, {
    autoConnect: false
  })
};

export const removeSocket = {
  type: REMOVE_SOCKET,
  payload: {}
};
