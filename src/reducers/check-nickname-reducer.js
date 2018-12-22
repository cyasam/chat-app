import {
  CHECK_NICKNAME_LOADING,
  CHECK_NICKNAME_SUCCESS,
  CHECK_NICKNAME_ERROR
} from '../actions/check-nickname-action';

const INITIAL_STATE = {
  isFetching: false,
  status: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_NICKNAME_LOADING:
      return { ...state, ...action.payload };
    case CHECK_NICKNAME_SUCCESS:
      return { ...state, ...action.payload };
    case CHECK_NICKNAME_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
