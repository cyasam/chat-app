import { PROFILE_LOADING, PROFILE_SUCCESS, PROFILE_ERROR } from '../actions/profile-action';

const INITIAL_STATE = {
  isFetching: false,
  data: {},
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, ...action.payload };
    case PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    case PROFILE_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
