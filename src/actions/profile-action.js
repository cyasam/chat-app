import requests from '../helpers/requests';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR = 'PROFILE_ERROR';

export default () => dispatch => {
  dispatch({
    type: PROFILE_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests.api
    .get('/profile')
    .then(result => {
      if (result.data.status) {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: {
            isFetching: false,
            data: { ...result.data },
            message: ''
          }
        });
      } else {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            isFetching: false,
            data: {},
            message: result.data.message
          }
        });
      }
    })
    .catch(error => {
      if (error.authDispatch) {
        dispatch(error.authDispatch);
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          isFetching: false,
          message: error.message
        }
      });
    });
};
