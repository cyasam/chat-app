export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export default fetchData => (dispatch) => {
  dispatch({
    type: REGISTER_LOADING,
    payload: {
      isFetching: true
    }
  });

  fetch('http://192.168.1.13:4567/auth/register', {
    method: 'post',
    body: JSON.stringify(fetchData),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).then((result) => {
    if (result.status) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          isFetching: false,
          status: true,
          message: result.message
        }
      });
    } else {
      dispatch({
        type: REGISTER_ERROR,
        payload: {
          isFetching: false,
          status: false,
          message: result.message
        }
      });
    }
  }).catch(() => {
    dispatch({
      type: REGISTER_ERROR,
      payload: {
        isFetching: false,
        status: false,
        message: 'Internal Error'
      }
    });
  });
};
