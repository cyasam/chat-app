import { PROFILE_FORM_SUCCESS } from '../actions/profile-form-action';
import { PROFILE_SUCCESS } from '../actions/profile-action';

export default store => next => action => {
  if (action.type === PROFILE_FORM_SUCCESS) {
    store.dispatch({
      type: PROFILE_SUCCESS,
      payload: {
        isFetching: false,
        data: action.payload.data,
        message: ''
      }
    });
  }

  next(action);
};
