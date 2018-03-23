import config from '../config';

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

  fetch('http://192.168.1.13:4567/auth/login', {
    method: 'post',
    body: JSON.stringify(fetchData),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(response => response.json()).then((result) => {
    if (result.status) {
      localStorage.setItem(config.TOKEN_KEY_NAME, result.token);
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          isFetching: false,
          auth: true,
          message: result.message
        }
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          isFetching: false,
          auth: false,
          message: result.message
        }
      });
    }
  }).catch((error) => {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        isFetching: false,
        auth: false,
        message: 'Internal error'
      }
    });
    throw error;
  });
};
