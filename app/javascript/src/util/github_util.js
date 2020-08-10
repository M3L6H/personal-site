import axios from "axios";

export const fetchCommits = (owner, repo) => (
  axios.get(`https://api.github.com/repos/${ owner }/${ repo }/commits`)
);
