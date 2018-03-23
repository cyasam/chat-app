import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR } from '../actions/register-action';

const INITIAL_STATE = {
  isFetching: false,
  status: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return { ...state, ...action.payload };
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload };
    case REGISTER_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
