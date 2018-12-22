import {
  GET_USERS_LIST_LOADING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR
} from '../actions/get-users-list-action';

const INITIAL_STATE = {
  isFetching: true,
  users: [],
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_LIST_LOADING:
      return { ...state, ...action.payload };
    case GET_USERS_LIST_SUCCESS:
      return { ...state, ...action.payload };
    case GET_USERS_LIST_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
