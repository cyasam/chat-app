import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from '../actions/auth-action';
import { LOGOUT_LOADING, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../actions/logout-action';

const INITIAL_STATE = {
  isFetching: false,
  auth: {},
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, ...action.payload };
    case AUTH_SUCCESS:
      return { ...state, ...action.payload };
    case AUTH_ERROR:
      return { ...state, ...action.payload };
    case LOGOUT_LOADING:
      return { ...state, ...action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
