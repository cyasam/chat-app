import requests from '../helpers/requests';

export const PROFILE_FORM_LOADING = 'PROFILE_FORM_LOADING';
export const PROFILE_FORM_SUCCESS = 'PROFILE_FORM_SUCCESS';
export const PROFILE_FORM_ERROR = 'PROFILE_FORM_ERROR';

export default formData => dispatch => {
  dispatch({
    type: PROFILE_FORM_LOADING,
    payload: {
      isFetching: true
    }
  });

  requests
    .api({
      method: 'post',
      url: '/profile/save',
      data: formData
    })
    .then(result => {
      if (result.data.status) {
        dispatch({
          type: PROFILE_FORM_SUCCESS,
          payload: {
            isFetching: false,
            status: true,
            data: result.data,
            message: result.data.message
          }
        });
      } else {
        dispatch({
          type: PROFILE_FORM_ERROR,
          payload: {
            isFetching: false,
            status: false,
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
        type: PROFILE_FORM_ERROR,
        payload: {
          isFetching: false,
          status: false,
          message: error.message
        }
      });
    });
};
