import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4567/auth',
  timeout: 2000
});

export default instance;
