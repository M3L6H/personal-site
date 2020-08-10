import axios from "./axios";

export const createSkill = (skill) => (
  axios({
    method: "post",
    url: "/api/skills",
    data: { skill },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const updateSkill = (skill) => (
  axios({
    method: "patch",
    url: `/api/skills/${ skill.id }`,
    data: { skill },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);

export const deleteSkill = (id) => (
  axios({
    method: "delete",
    url: `/api/skills/${ id }`,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);
