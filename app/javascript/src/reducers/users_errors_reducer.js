import { 
  RECEIVE_USERS_ERRORS, 
  RECEIVE_USER, 
  REMOVE_USER 
} from "../actions/users_actions";

export default (state={}, { type, errors }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_USERS_ERRORS:
      return errors;
    case RECEIVE_USER:
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};