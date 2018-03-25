import config from '../config';
import { AUTH_ERROR } from './auth-action';

export const PROFILE_FORM_LOADING = 'PROFILE_FORM_LOADING';
export const PROFILE_FORM_SUCCESS = 'PROFILE_FORM_SUCCESS';
export const PROFILE_FORM_ERROR = 'PROFILE_FORM_ERROR';

export default formData => (dispatch) => {
  dispatch({
    type: PROFILE_FORM_LOADING,
    payload: {
      isFetching: true
    }
  });

  const token = localStorage.getItem(config.TOKEN_KEY_NAME);

  fetch('http://192.168.1.13:4567/api/profile/save', {
    method: 'post',
    body: JSON.stringify(formData),
    headers: new Headers({
      'Content-Type': 'application/json',
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
        type: PROFILE_FORM_SUCCESS,
        payload: {
          isFetching: false,
          status: true,
          data: result.data,
          message: result.message
        }
      });
    } else {
      dispatch({
        type: PROFILE_FORM_ERROR,
        payload: {
          isFetching: false,
          status: false,
          message: result.message
        }
      });
    }
  }).catch((error) => {
    if (error.status === 401) {
      localStorage.removeItem(config.TOKEN_KEY_NAME);
      dispatch({
        type: AUTH_ERROR,
        payload: {
          isFetching: false,
          auth: {},
          message: ''
        }
      });
    }

    dispatch({
      type: PROFILE_FORM_ERROR,
      payload: {
        isFetching: false,
        status: false,
        message: 'Internal Error'
      }
    });
  });
};
