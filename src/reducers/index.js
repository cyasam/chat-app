import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import registerFormReducer from './register-form-reducer';
import profileReducer from './profile-reducer';
import profileFormReducer from './profile-form-reducer';

export default combineReducers({
  authentication: authReducer,
  register: registerReducer,
  registerForm: registerFormReducer,
  profile: profileReducer,
  profileForm: profileFormReducer
});
