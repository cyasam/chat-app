export default {
  TOKEN_KEY_NAME: 'jwtToken',
  API_URL: process.env.NODE_ENV === 'production' ? 'http://18.184.62.255:4567' : 'http://localhost:4567'
};
