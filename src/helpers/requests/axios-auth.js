import axios from 'axios';
import config from '../../config';

const instance = axios.create({
  baseURL: `${config.API_URL}/auth`,
  timeout: 2000
});

export default instance;
