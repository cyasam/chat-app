import config from '../config';
import requests from '../helpers/requests';

export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export default (email, password) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: {
      isFetching: true
    }
  });

  const fetchData = {
    email,
    password
  };

  requests.auth({
    method: 'post',
    url: '/login',
    data: fetchData
  }).then((result) => {
    if (result.data.status) {
      localStorage.setItem(config.TOKEN_KEY_NAME, result.data.token);
      requests.apiReInit();
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          isFetching: false,
          auth: {
            status: true,
            activated: result.data.activated
          },
          message: result.data.message
        }
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          isFetching: false,
          auth: {
            status: false
          },
          activated: false,
          message: result.data.message
        }
      });
    }
  }).catch((error) => {
    let errorMessage;
    if (error.response.status === 401) {
      errorMessage = 'Wrong email and/or password';
    } else {
      errorMessage = error.response.data.message;
    }

    dispatch({
      type: AUTH_ERROR,
      payload: {
        isFetching: false,
        auth: {
          status: false
        },
        message: errorMessage
      }
    });
  });
};
