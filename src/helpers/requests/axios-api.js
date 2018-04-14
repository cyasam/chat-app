import axios from 'axios';
import config from '../../config';

const init = () => {
  const instance = axios.create({
    baseURL: `${config.API_URL}/api`,
    timeout: 2000
  });

  const token = localStorage.getItem(config.TOKEN_KEY_NAME);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return instance;
};

export const reInit = () => {
  init();
};

export default init;
