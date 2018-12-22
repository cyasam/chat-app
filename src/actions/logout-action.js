import config from '../config';

export const LOGOUT_LOADING = 'LOGOUT_LOADING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export default () => dispatch => {
  dispatch({
    type: LOGOUT_LOADING,
    payload: {
      authentication: {
        isFetching: true
      },
      profile: {
        isFetching: true
      }
    }
  });

  localStorage.removeItem(config.TOKEN_KEY_NAME);

  if (!localStorage.getItem(config.TOKEN_KEY_NAME)) {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {
        authentication: {
          isFetching: false,
          auth: {
            status: false
          },
          message: ''
        },
        profile: {
          isFetching: false,
          data: {},
          message: ''
        }
      }
    });
  } else {
    dispatch({
      type: LOGOUT_ERROR,
      payload: {
        authentication: {
          isFetching: false,
          message: ''
        },
        profile: {
          isFetching: false,
          message: ''
        }
      }
    });
  }
};
