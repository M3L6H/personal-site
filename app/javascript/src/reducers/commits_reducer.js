import { RECEIVE_COMMITS } from "../actions/github_actions";

export default (state={}, { type, commits }) => {
  Object.freeze(state);

  switch(type) {
    case RECEIVE_COMMITS:
      return commits;
    default:
      return state;
  }
};
