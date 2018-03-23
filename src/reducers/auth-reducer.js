import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from '../actions/auth-action';

const INITIAL_STATE = {
  isFetching: false,
  auth: false,
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
    default:
      return state;
  }
};
