import * as APIUtil from "../util/posts_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_POSTS_ERRORS = "RECEIVE_POST_ERRORS";

export const receivePosts = ({ posts, taggings, tags }) => ({
  type: RECEIVE_POSTS,
  posts,
  taggings,
  tags
});

export const receivePost = ({ post, taggings, tags }) => ({
  type: RECEIVE_POST,
  post,
  taggings,
  tags
});

export const removePost = ({ id }) => ({
  type: REMOVE_POST,
  id
});

export const receivePostErrors = (errors) => ({
  type: RECEIVE_POSTS_ERRORS,
  errors
});

export const fetchPosts = query => dispatch => (
  APIUtil.fetchPosts(query)
    .then(({ data }) => dispatch(receivePosts(data)))
    .catch(err => dispatch(receivePostErrors(err.response.data)))
);

export const fetchPost = id => dispatch => (
  APIUtil.fetchPost(id)
    .then(({ data }) => dispatch(receivePost(data)))
    .catch(err => dispatch(receivePostErrors(err.response.data)))
);

export const createPost = post => dispatch => (
  APIUtil.createPost(post)
    .then(({ data }) => dispatch(receivePost(data)))
    .catch(err => dispatch(receivePostErrors(err.response.data)))
);

export const updatePost = post => dispatch => (
  APIUtil.updatePost(post)
    .then(({ data }) => dispatch(receivePost(data)))
    .catch(err => dispatch(receivePostErrors(err.response.data)))
);

export const deletePost = id => dispatch => (
  APIUtil.deletePost(id)
    .then(({ data }) => dispatch(removePost(data)))
    .catch(err => dispatch(receivePostErrors(err.response.data)))
);
