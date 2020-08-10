import axios from "./axios";

export const fetchSubject = () => (
  axios({
    method: "get",
    url: "/api/subject",
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);