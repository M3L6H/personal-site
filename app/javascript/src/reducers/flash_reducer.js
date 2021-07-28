import { RECEIVE_FLASH, CLEAR_FLASH } from "../actions/flash_actions";

export default (state={}, { type, flash }) => {
  Object.freeze(state);

  switch(type) {
    case RECEIVE_FLASH:
      return flash;
    case CLEAR_FLASH:
      return { ...state, hidden: true };
    default:
      return { ...state, hidden: true };
  }
};