import {
  ALL_BREEDS_FAILED,
  ALL_BREEDS_LOADED,
  ALL_USERS_FAILED,
  ALL_USERS_LOADED,
  GET_ALL_BREEDS_ATTEMPT,
  GET_ALL_USERS_ATTEMPT,
  GET_USER_BY_ID,
  PROFILE_DATA_ATTEMPT,
  PROFILE_DATA_FAILED,
  PROFILE_DATA_LOADED,
  PROFILE_DATA_UPLOADED,
  SHOW_CONFIRM_CODE,
  SHOW_NEW_PROFILE_SCREEN,
  SHOW_REGISTER_SCREEN,
  SIGN_OUT_USER,
  USER_DATA_LOADED,
  USER_DELETED,
} from '../actions/types';

const INITIAL_STATE = {
  allBreeds: [],
  allUsers: [],
  errorMessage: '',
  isConfirmCodeVisible: false,
  isLoading: false,
  isNewProfileScreenVisible: true,
  isRegisterScreenVisible: false,
  userInfo: {},
  userProfileInfo: {},
  userProfileLoaded: false,
  userProfileUploaded: false,
  selectedUser: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_CONFIRM_CODE:
      return { ...state, isConfirmCodeVisible: action.isVisible };

    case SHOW_REGISTER_SCREEN:
      return { ...state, isRegisterScreenVisible: action.isVisible };

    case SHOW_NEW_PROFILE_SCREEN:
      return { ...state, isNewProfileScreenVisible: action.isVisible };

    case GET_USER_BY_ID:
      return { ...state, selectedUser: action.selectedUser };

    case USER_DATA_LOADED:
      return { ...state, userInfo: action.userInfo };

    case GET_ALL_BREEDS_ATTEMPT:
      return { ...state, isLoading: true };

    case ALL_BREEDS_LOADED:
      return { ...state, allBreeds: action.data, isLoading: false };

    case ALL_BREEDS_FAILED:
      return { ...state, errorMessage: action.error, isLoading: false };

    case GET_ALL_USERS_ATTEMPT:
      return { ...state, isLoading: true };

    case ALL_USERS_LOADED:
      return { ...state, allUsers: action.data, isLoading: false };

    case ALL_USERS_FAILED:
      return { ...state, errorMessage: action.error, isLoading: false };

    case USER_DELETED:
      return {
        ...state,
        allUsers: state.allUsers.filter(
          user => user.clientId !== action.userId,
        ),
      };

    case SIGN_OUT_USER:
      return { ...INITIAL_STATE };

    case PROFILE_DATA_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        userProfileLoaded: false,
        userProfileUploaded: false,
      };
    case PROFILE_DATA_FAILED:
      return {
        ...state,
        errorMessage: action.error,
        isLoading: false,
        userProfileLoaded: false,
        userProfileUploaded: false,
      };
    case PROFILE_DATA_LOADED:
      return {
        ...state,
        userProfileInfo: action.data,
        isLoading: false,
        userProfileLoaded: true,
      };
    case PROFILE_DATA_UPLOADED:
      return { ...state, isLoading: false, userProfileUploaded: true };
    default:
      return state;
  }
}
