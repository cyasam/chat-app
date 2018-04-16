import config from '../config';
import requests from '../helpers/requests';
import { createSocket } from './chat-socket-action';

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

      dispatch(createSocket);

      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          isFetching: false,
          auth: {
            status: result.data.status,
            ...result.data.info
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
    dispatch({
      type: AUTH_ERROR,
      payload: {
        isFetching: false,
        auth: {
          status: false
        },
        message: error.message
      }
    });
  });
};
