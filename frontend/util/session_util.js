export const createSession = (user) => (
  $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user },
    dataType: "json"
  })
);

export const deleteSession = () => (
  $.ajax({
    method: "DELETE",
    url: `/api/session`,
    dataType: "json"
  })
);