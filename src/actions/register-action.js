import requests from '../helpers/requests';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export default fetchData => dispatch => {
  dispatch({
    type: REGISTER_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests
    .auth({
      method: 'put',
      url: '/register/complete',
      data: fetchData
    })
    .then(result => {
      if (result.data.status) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            isFetching: false,
            activated: true,
            message: result.data.message
          }
        });
      } else {
        dispatch({
          type: REGISTER_ERROR,
          payload: {
            isFetching: false,
            activated: false,
            message: result.data.message
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REGISTER_ERROR,
        payload: {
          isFetching: false,
          activated: false,
          message: error.message
        }
      });
    });
};
