import config from '../config';
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from './auth-action';

export default () => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: {
      isFetching: true
    }
  });

  const token = localStorage.getItem(config.TOKEN_KEY_NAME);

  fetch('http://192.168.1.13:4567/api/profile', {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  }).then((result) => {
    if (result.status && result.data) {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          isFetching: false,
          auth: {
            status: true,
            activated: result.data.activated
          },
          message: ''
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
          message: ''
        }
      });
    }
  }).catch(() => {
    localStorage.removeItem(config.TOKEN_KEY_NAME);
    dispatch({
      type: AUTH_ERROR,
      payload: {
        isFetching: false,
        auth: {
          status: false
        },
        message: ''
      }
    });
  });
};
