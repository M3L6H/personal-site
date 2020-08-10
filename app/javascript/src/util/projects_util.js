import axios from "./axios";

export const createProject = (projectData) => (
  axios({
    method: "post",
    url: "/api/projects",
    data: projectData,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);
