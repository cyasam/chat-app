import axios from 'axios';
import config from '../../config';
import { AUTH_ERROR } from '../../actions/auth-action';

const instance = axios.create({
  baseURL: `${config.API_URL}/auth`,
  timeout: 2000
});

instance.interceptors.response.use(
  response => response,
  err => {
    const error = err;

    if (error.response) {
      if (error.response.status === 401) {
        const message = 'Wrong email or password.';
        localStorage.removeItem(config.TOKEN_KEY_NAME);

        error.authDispatch = {
          type: AUTH_ERROR,
          payload: {
            isFetching: false,
            auth: {
              status: false
            },
            message
          }
        };

        error.message = message;
      } else {
        error.message = error.response.data.message;
      }
    } else {
      error.message = 'Internal Error';
    }

    return Promise.reject(error);
  }
);

export default instance;
