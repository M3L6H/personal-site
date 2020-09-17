import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  REMOVE_POST
} from '../actions/posts_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_POSTS:
    case RECEIVE_POST:
      return { ...action.taggings };
    case REMOVE_POST:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
