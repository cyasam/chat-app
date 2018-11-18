import requests from '../helpers/requests';

export const REGISTER_FORM_LOADING = 'REGISTER_FORM_LOADING';
export const REGISTER_FORM_SUCCESS = 'REGISTER_FORM_SUCCESS';
export const REGISTER_FORM_ERROR = 'REGISTER_FORM_ERROR';

export default fetchData => dispatch => {
  dispatch({
    type: REGISTER_FORM_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests
    .auth({
      method: 'post',
      url: '/register',
      data: fetchData
    })
    .then(result => {
      if (result.data.status) {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          payload: {
            isFetching: false,
            status: true,
            message: result.data.message
          }
        });
      } else {
        dispatch({
          type: REGISTER_FORM_ERROR,
          payload: {
            isFetching: false,
            status: false,
            message: result.data.message
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: REGISTER_FORM_ERROR,
        payload: {
          isFetching: false,
          status: false,
          message: error.message
        }
      });
    });
};