import { RECEIVE_SESSION, REMOVE_SESSION } from "../actions/session_actions";

const _defaultState = {
  currentUserId: null
};

export default (state=_defaultState, { type, user }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_SESSION:
      return { currentUserId: user.id };
    case REMOVE_SESSION:
      return _defaultState;
    default:
      return state;
  }
};