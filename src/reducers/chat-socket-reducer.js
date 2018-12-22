import { CREATE_SOCKET, REMOVE_SOCKET } from '../actions/chat-socket-action';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SOCKET:
      return action.payload;
    case REMOVE_SOCKET:
      return action.payload;
    default:
      return state;
  }
};
