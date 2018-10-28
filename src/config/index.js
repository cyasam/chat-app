export default {
  TOKEN_KEY_NAME: 'jwtToken',
  API_URL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4567'
};
