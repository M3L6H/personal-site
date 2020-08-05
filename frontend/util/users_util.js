export const fetchUser = (userId) => (
  $.ajax({
    method: "GET",
    url: `/api/users/${ userId }`,
    dataType: "json"
  })
);

export const deleteUser = (userId) => (
  $.ajax({
    method: "DELETE",
    url: `/api/users/${ userId }`,
    dataType: "json"
  })
);

export const updateUser = (userData) => (
  $.ajax({
    method: "PATCH",
    url: `/api/users/${ userData.get("user[id]") }`,
    data: userData,
    contentType: false,
    processData: false
  })
);
