export const MENU_OPEN = 'MENU_OPEN';
export const MENU_CLOSE = 'MENU_CLOSE';

export default () => (dispatch, getState) => {
  if (!getState().menuOpen.status) {
    dispatch({
      type: MENU_OPEN,
      payload: {
        status: true
      }
    });
  } else {
    dispatch({
      type: MENU_CLOSE,
      payload: {
        status: false
      }
    });
  }
};
