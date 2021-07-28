import { RECEIVE_USER, REMOVE_USER } from "../actions/users_actions";
import { RECEIVE_SESSION } from "../actions/session_actions";

export default (state={}, { type, user }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_SESSION:
    case RECEIVE_USER:
      return { ...state, [user.id]: user };
    case REMOVE_USER: {
      const newState = Object.assign({}, state);
      delete newState[user.id];
      return newState;
    }
    default:
      return state;
  }
};