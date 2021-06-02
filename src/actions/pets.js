import {
  BIG_PET_HEIGHT,
  MEDIUM_PET_HEIGHT,
  SMALL_PET_HEIGHT,
} from '../constants';
import { SHOW_CATEGORY_SCREEN, FILTER_PET_LIST, GET_PET_BY_ID } from './types';

export function filterPetListByCategory({ category, pets = [] }) {
  return async dispatch => {
    try {
      const filteredPets = pets.filter(pet => {
        const { metric } = pet.height;
        let petHeight = metric;

        if (petHeight && petHeight.includes('-')) {
          petHeight = metric.split('-')[1];
        }

        petHeight = petHeight.trim();

        switch (category) {
          case SMALL_PET_HEIGHT:
            if (petHeight <= category) {
              return pet;
            }
            break;
          case MEDIUM_PET_HEIGHT:
            if (petHeight >= SMALL_PET_HEIGHT && petHeight <= BIG_PET_HEIGHT) {
              return pet;
            }
            break;
          case BIG_PET_HEIGHT:
            if (petHeight >= category) {
              return pet;
            }
            break;
          default:
            break;
        }
      });

      dispatch({ data: filteredPets, type: FILTER_PET_LIST });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPetById({ petId }) {
  return async (dispatch, getState) => {
    try {
      const { allBreeds } = getState().auth;
      const profilePet = allBreeds.find(pet => pet.id === petId);

      dispatch({ petData: profilePet, type: GET_PET_BY_ID });
    } catch (error) {
      console.log(error);
    }
  };
}

export function showCategoryScreenChanged({ isVisible }) {
  return {
    isVisible,
    type: SHOW_CATEGORY_SCREEN,
  };
}