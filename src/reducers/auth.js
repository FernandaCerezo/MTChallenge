import {
  ALL_BREEDS_FAILED,
  ALL_BREEDS_LOADED,
  GET_ALL_BREEDS_ATTEMPT,
  SHOW_CONFIRM_CODE,
  SHOW_REGISTER_SCREEN,
  USER_DATA_LOADED,
} from '../actions/types';

const INITIAL_STATE = {
  allBreeds: [],
  errorMessage: '',
  isConfirmCodeVisible: false,
  isLoading: false,
  isRegisterScreenVisible: false,
  userName: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_CONFIRM_CODE:
      return { ...state, isConfirmCodeVisible: action.isVisible };
    case SHOW_REGISTER_SCREEN:
      return { ...state, isRegisterScreenVisible: action.isVisible };
    case USER_DATA_LOADED:
      return { ...state, userName: action.userName };
    case GET_ALL_BREEDS_ATTEMPT:
      return { ...state, isLoading: true };
    case ALL_BREEDS_LOADED:
      return { ...state, allBreeds: action.data, isLoading: false };
    case ALL_BREEDS_FAILED:
      return { ...state, errorMessage: action.error, isLoading: false };

    default:
      return state;
  }
}
