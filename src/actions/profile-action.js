import config from '../config';
import { AUTH_ERROR } from './auth-action';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR = 'PROFILE_ERROR';

export default () => (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
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
    if (result.status) {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: {
          isFetching: false,
          data: result.data,
          message: ''
        }
      });
    } else {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          isFetching: false,
          data: {},
          message: 'Data not loaded'
        }
      });
    }
  }).catch((error) => {
    if (error.status === 401) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          isFetching: false,
          auth: false,
          message: 'Please login again.'
        }
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        isFetching: false,
        status: false,
        message: 'Internal Error'
      }
    });
  });
};
