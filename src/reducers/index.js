import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import registerFormReducer from './register-form-reducer';
import profileReducer from './profile-reducer';
import profileFormReducer from './profile-form-reducer';
import getUsersListReducer from './get-users-list-reducer';
import chatSocketReducer from './chat-socket-reducer';
import checkNicknameReducer from './check-nickname-reducer';

export default combineReducers({
  authentication: authReducer,
  register: registerReducer,
  registerForm: registerFormReducer,
  profile: profileReducer,
  profileForm: profileFormReducer,
  usersList: getUsersListReducer,
  chatSocket: chatSocketReducer,
  checkNickname: checkNicknameReducer
});
