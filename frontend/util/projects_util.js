export const createProject = (projectData) => (
  $.ajax({
    method: "POST",
    url: "/api/projects",
    data: projectData,
    contentType: false,
    processData: false
  })
);
