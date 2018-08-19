import config from '../config';

export const LOGOUT_LOADING = 'LOGOUT_LOADING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export default () => dispatch => {
  dispatch({
    type: LOGOUT_LOADING,
    payload: {
      isFetching: true
    }
  });

  localStorage.removeItem(config.TOKEN_KEY_NAME);

  if (!localStorage.getItem(config.TOKEN_KEY_NAME)) {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {
        isFetching: false,
        auth: {
          status: false
        },
        message: ''
      }
    });
  } else {
    dispatch({
      type: LOGOUT_ERROR,
      payload: {
        isFetching: false,
        message: ''
      }
    });
  }
};
