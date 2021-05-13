import { SHOW_CONFIRM_CODE, SHOW_REGISTER_SCREEN } from './types';

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
