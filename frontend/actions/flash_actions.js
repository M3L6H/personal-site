export const RECEIVE_FLASH = "RECEIVE_FLASH";
export const CLEAR_FLASH = "CLEAR_FLASH";

export const receiveFlash = (flash) => ({
  type: RECEIVE_FLASH,
  flash
});

export const clearFlash = () => ({
  type: CLEAR_FLASH
});