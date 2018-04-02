import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.13:4567/auth',
  timeout: 2000
});

export default instance;
