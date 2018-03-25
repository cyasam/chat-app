import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import profileReducer from './profile-reducer';
import profileFormReducer from './profile-form-reducer';

export default combineReducers({
  authentication: authReducer,
  registerForm: registerReducer,
  profile: profileReducer,
  profileForm: profileFormReducer
});
