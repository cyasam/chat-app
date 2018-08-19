import config from '../config';
import requests from '../helpers/requests';
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from './auth-action';
import { createSocket } from './chat-socket-action';

export default () => dispatch => {
  dispatch({
    type: AUTH_LOADING,
    payload: {
      isFetching: true
    }
  });

  const token = localStorage.getItem(config.TOKEN_KEY_NAME);

  if (!token) {
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
  } else {
    requests.api
      .get('/profile')
      .then(result => {
        if (result.data.status) {
          dispatch(createSocket);

          dispatch({
            type: AUTH_SUCCESS,
            payload: {
              isFetching: false,
              auth: result.data,
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
      })
      .catch(() => {
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
  }
};
