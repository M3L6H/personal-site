import axios from "./axios";

export const fetchUser = (userId) => (
  axios({
    method: "get",
    url: `/api/users/${ userId }`,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const deleteUser = (userId) => (
  axios({
    method: "delete",
    url: `/api/users/${ userId }`,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const updateUser = (userData) => (
  axios({
    method: "patch",
    url: `/api/users/${ userData.get("user[id]") }`,
    data: userData,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

// ({
//   method: "PATCH",
//   url: `/api/users/${ userData.get("user[id]") }`,
//   data: userData,
//   contentType: false,
//   processData: false
// })
