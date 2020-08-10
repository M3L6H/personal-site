import axios from "./axios";

export const createSession = (user) => (
  axios({
    method: "post",
    url: "/api/session",
    data: { user },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const deleteSession = () => (
  axios({
    method: "delete",
    url: "/api/session",
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);