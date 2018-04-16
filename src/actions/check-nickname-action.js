import requests from '../helpers/requests';

export const CHECK_NICKNAME_LOADING = 'CHECK_NICKNAME_LOADING';
export const CHECK_NICKNAME_SUCCESS = 'CHECK_NICKNAME_SUCCESS';
export const CHECK_NICKNAME_ERROR = 'CHECK_NICKNAME_ERROR';

export default nickname => (dispatch) => {
  dispatch({
    type: CHECK_NICKNAME_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests.api.get('/checknickname', {
    params: { nickname }
  }).then((result) => {
    if (result.data.status) {
      dispatch({
        type: CHECK_NICKNAME_SUCCESS,
        payload: {
          isFetching: false,
          status: result.data.status,
          message: result.data.message
        }
      });
    } else {
      dispatch({
        type: CHECK_NICKNAME_ERROR,
        payload: {
          isFetching: false,
          status: result.data.status,
          message: result.data.message
        }
      });
    }
  }).catch((error) => {
    dispatch({
      type: CHECK_NICKNAME_ERROR,
      payload: {
        isFetching: false,
        status: false,
        message: error.message
      }
    });
  });
};
