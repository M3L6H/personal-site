export const createSkill = (skill) => (
  $.ajax({
    method: "POST",
    url: "/api/skills",
    data: { skill },
    dataType: "json"
  })
);

export const updateSkill = (skill) => (
  $.ajax({
    method: "PATCH",
    url: `/api/skills/${ skill.id }`,
    data: { skill },
    dataType: "json"
  })
);

export const deleteSkill = (skill) => {
  $.ajax({
    method: "DELETE",
    url: `/api/skills/${ skill.id }`,
    dataType: "json"
  }) 
};
