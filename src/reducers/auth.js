import { SHOW_CONFIRM_CODE, SHOW_REGISTER_SCREEN } from '../actions/types';

const INITIAL_STATE = {
  isConfirmCodeVisible: false,
  isRegisterScreenVisible: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_CONFIRM_CODE:
      return { ...state, isConfirmCodeVisible: action.isVisible };
    case SHOW_REGISTER_SCREEN:
      return { ...state, isRegisterScreenVisible: action.isVisible };
    default:
      return state;
  }
}
