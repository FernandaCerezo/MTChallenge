import {
  FILTER_PET_LIST,
  SHOW_CATEGORY_SCREEN,
  GET_PET_BY_ID,
} from '../actions/types';

const INITIAL_STATE = {
  isCategoryScreenVisible: false,
  petsList: [],
  petSelectedById: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PET_BY_ID:
      return { ...state, petSelectedById: action.petData };
    case SHOW_CATEGORY_SCREEN:
      return { ...state, isCategoryScreenVisible: action.isVisible };
    case FILTER_PET_LIST:
      return { ...state, petsList: action.data };
    default:
      return state;
  }
}
