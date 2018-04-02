import config from '../config';
import requests from '../helpers/requests';
import { AUTH_ERROR } from './auth-action';

export const GET_USERS_LIST_LOADING = 'GET_USERS_LIST_LOADING';
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
export const GET_USERS_LIST_ERROR = 'GET_USERS_LIST_ERROR';

export default () => (dispatch) => {
  dispatch({
    type: GET_USERS_LIST_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests.api.get('/userlist').then((result) => {
    if (result.data.status) {
      dispatch({
        type: GET_USERS_LIST_SUCCESS,
        payload: {
          isFetching: false,
          users: result.data.users,
          message: ''
        }
      });
    } else {
      dispatch({
        type: GET_USERS_LIST_ERROR,
        payload: {
          isFetching: false,
          users: [],
          message: result.data.message
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
          auth: {
            status: false
          },
          message: ''
        }
      });
    }

    dispatch({
      type: GET_USERS_LIST_ERROR,
      payload: {
        isFetching: false,
        message: error.response.data.message
      }
    });
  });
};
