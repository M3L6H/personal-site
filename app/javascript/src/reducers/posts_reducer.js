import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  REMOVE_POST
} from '../actions/posts_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_POSTS:
      return { ...action.posts };
    case RECEIVE_POST:
      return { ...state, [action.post.id]: action.post };
    case REMOVE_POST:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
