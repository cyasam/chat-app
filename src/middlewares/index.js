import thunk from 'redux-thunk';
import logger from 'redux-logger';
import profileFormSuccess from './profile-form-success';

export default [
  thunk, profileFormSuccess, logger
];
