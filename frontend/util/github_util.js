export const fetchCommits = (owner, repo) => (
  $.ajax({
    method: "GET",
    url: `https://api.github.com/repos/${ owner }/${ repo }/commits`
  })
);
