import { MENU_OPEN, MENU_CLOSE } from '../actions/menu-click-action';

const INITIAL_STATE = {
  status: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return { ...state, ...action.payload };
    case MENU_CLOSE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
