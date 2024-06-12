import { RECEIVE_USER } from "../actions/users_actions";
import { RECEIVE_SUBJECT } from "../actions/subject_actions";

export default (state={}, action) => {
  Object.freeze(state);

  let subject = action.subject;
  
  // eslint-disable-next-line
  switch(action.type) {
    case RECEIVE_USER: {
      if (!action.user.admin) return null;
      subject = action.user;
    }
    case RECEIVE_SUBJECT:
      return subject;
    default:
      return state;
  }
};
