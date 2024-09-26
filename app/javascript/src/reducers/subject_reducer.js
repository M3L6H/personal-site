import { RECEIVE_USER } from "../actions/users_actions";
import { RECEIVE_SUBJECT } from "../actions/subject_actions";

// eslint-disable-next-line
export default (state={}, action) => {
  Object.freeze(state);

  let subject = action.subject;
  
  switch(action.type) {
    case RECEIVE_USER:
      if (!action.user.admin) break;
      subject = action.user;
    case RECEIVE_SUBJECT:
      return subject;
    default:
      return state;
  }
};
