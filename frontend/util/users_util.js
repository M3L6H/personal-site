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

export const updateUser = (user) => (
  $.ajax({
    method: "PATCH",
    url: `/api/users/${ user.id }`,
    data: { user },
    dataType: "json"
  })
);
