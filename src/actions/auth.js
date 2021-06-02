import {
  ALL_BREEDS_FAILED,
  ALL_BREEDS_LOADED,
  ALL_USERS_FAILED,
  ALL_USERS_LOADED,
  GET_ALL_BREEDS_ATTEMPT,
  GET_ALL_USERS_ATTEMPT,
  GET_USER_BY_ID,
  SHOW_CONFIRM_CODE,
  SHOW_REGISTER_SCREEN,
  USER_DATA_LOADED,
} from './types';
import axios from 'axios';
import ENV from '../env';
import SECRETS from '../secrets';
import { DataStore } from 'aws-amplify';
import { UserData } from '../models';

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

export function userDataLoaded({ userInfo }) {
  return {
    userInfo,
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

export function getAllUsers() {
  return async dispatch => {
    try {
      dispatch({ type: GET_ALL_USERS_ATTEMPT });
      const response = await DataStore.query(UserData, data =>
        data.isAdmin('eq', false),
      );

      if (response.length) {
        dispatch({
          data: response,
          type: ALL_USERS_LOADED,
        });
      }
    } catch (error) {
      dispatch({ error, type: ALL_USERS_FAILED });
    }
  };
}

export function getUserById({ userId }) {
  return async (dispatch, getState) => {
    try {
      const { allUsers } = getState().auth;
      const profileUser = allUsers.find(user => user.clientId === userId);

      dispatch({ selectedUser: profileUser, type: GET_USER_BY_ID });
    } catch (error) {
      console.log(error);
    }
  };
}
