import { 
  RECEIVE_SESSION_ERRORS, 
  RECEIVE_SESSION, 
  REMOVE_SESSION 
} from "../actions/session_actions";

export default (state={}, { type, errors }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_SESSION_ERRORS:
      return errors;
    case RECEIVE_SESSION:
    case REMOVE_SESSION:
      return {};
    default:
      return state;
  }
};