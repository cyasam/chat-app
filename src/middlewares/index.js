import thunk from 'redux-thunk';
import logger from 'redux-logger';
import profileFormSuccess from './profile-form-success';
import chatSocket from './chat-socket';

export default [
  thunk, chatSocket, profileFormSuccess, logger
];
