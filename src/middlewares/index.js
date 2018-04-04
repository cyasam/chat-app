import thunk from 'redux-thunk';
import logger from 'redux-logger';
import profileFormSuccess from './profile-form-success';
import chatSocket from './chat-socket';

const middlewares = [thunk, chatSocket, profileFormSuccess];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default middlewares;
