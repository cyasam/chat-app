import api, { reInit } from './axios-api';
import auth from './axios-auth';

export default {
  api: api(), auth, apiReInit: reInit
};
