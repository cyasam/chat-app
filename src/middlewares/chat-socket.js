import { AUTH_SUCCESS } from '../actions/auth-action';
import { LOGOUT_SUCCESS } from '../actions/logout-action';
import { removeSocket } from '../actions/chat-socket-action';

export default store => next => action => {
  if (action.type === AUTH_SUCCESS) {
    const { chatSocket } = store.getState();
    chatSocket.connect();
  } else if (action.type === LOGOUT_SUCCESS) {
    const { chatSocket } = store.getState();
    chatSocket.disconnect();
    store.dispatch(removeSocket);
  }

  next(action);
};
