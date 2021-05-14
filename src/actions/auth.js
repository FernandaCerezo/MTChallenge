import {
  ALL_BREEDS_FAILED,
  ALL_BREEDS_LOADED,
  GET_ALL_BREEDS_ATTEMPT,
  SHOW_CONFIRM_CODE,
  SHOW_REGISTER_SCREEN,
  USER_DATA_LOADED,
} from './types';
import axios from 'axios';
import ENV from '../env';
import SECRETS from '../secrets';

export function showRegisterScreenChanged({ isVisible }) {
  return {
    isVisible,
    type: SHOW_REGISTER_SCREEN,
  };
}

export function showConfirmCodeChanged({ isVisible }) {
  return {
    isVisible,
    type: SHOW_CONFIRM_CODE,
  };
}

export function userDataLoaded({ userName }) {
  return {
    userName,
    type: USER_DATA_LOADED,
  };
}

export function getAllBreeds() {
  return async dispatch => {
    try {
      dispatch({ type: GET_ALL_BREEDS_ATTEMPT });
      const headers = {
        Authorization: `Basic ${SECRETS.DOG_SERVICE_API_KEY}`,
      };

      axios.get(`${ENV.API_URL}/breeds`, headers).then(response => {
        if (response) {
          const { data } = response;
          dispatch({
            data: data,
            type: ALL_BREEDS_LOADED,
          });
        }
      });
    } catch (error) {
      dispatch({ error, type: ALL_BREEDS_FAILED });
    }
  };
}
