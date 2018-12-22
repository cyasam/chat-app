import {
  PROFILE_FORM_LOADING,
  PROFILE_FORM_SUCCESS,
  PROFILE_FORM_ERROR
} from '../actions/profile-form-action';

const INITIAL_STATE = {
  isFetching: false,
  status: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FORM_LOADING:
      return { ...state, ...action.payload };
    case PROFILE_FORM_SUCCESS:
      return { ...state, ...action.payload };
    case PROFILE_FORM_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
