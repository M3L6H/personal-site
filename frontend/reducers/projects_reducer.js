export default (state={}, { type }) => {
  Object.freeze(state);
  
  switch(type) {
    default:
      return state;
  }
};