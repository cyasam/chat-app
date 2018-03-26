import { REGISTER_FORM_LOADING, REGISTER_FORM_SUCCESS, REGISTER_FORM_ERROR } from '../actions/register-form-action';

const INITIAL_STATE = {
  isFetching: false,
  status: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_FORM_LOADING:
      return { ...state, ...action.payload };
    case REGISTER_FORM_SUCCESS:
      return { ...state, ...action.payload };
    case REGISTER_FORM_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
