export const fetchSubject = () => (
  $.ajax({
    method: "GET",
    url: "/api/subject",
    dataType: "json"
  })
);