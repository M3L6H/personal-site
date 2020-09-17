import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../actions/posts_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_POSTS:
    case RECEIVE_POST:
      return { ...action.tags };
    default:
      return state;
  }
};
