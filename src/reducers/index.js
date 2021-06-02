import { combineReducers } from 'redux';
import AuthReducer from './auth';
import PetsReducer from './pets';

export default combineReducers({
  auth: AuthReducer,
  pets: PetsReducer,
});
