import axios from "./axios";

export const fetchPosts = (params={}) => (
  axios({
    method: "get",
    url: "/api/posts",
    params,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const fetchPost = (id) => (
  axios({
    method: "get",
    url: `/api/posts/${ id }`,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const createPost = (post) => (
  axios({
    method: "post",
    url: "/api/posts",
    data: { post },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const updatePost = (post) => (
  axios({
    method: "patch",
    url: `/api/posts/${ post.id }`,
    data: { post },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const deletePost = (id) => (
  axios({
    method: "delete",
    url: `/api/posts/${ id }`,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);
