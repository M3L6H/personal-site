import * as APIUtil from '../util/github_util';

export const RECEIVE_COMMITS = "RECEIVE_COMMITS";

export const receiveCommits = (commits) => ({
  type: RECEIVE_COMMITS,
  commits
});

export const fetchCommits = (projects) => dispatch => {
  let count = 0;
  const commits = {};

  Object.values(projects).forEach(project => {
    const parts = project.github.split("/");
    const repo = parts[parts.length - 1];
    const owner = parts[parts.length - 2];
    ++count;
    APIUtil.fetchCommits(owner, repo)
      .then(({ data }) => { // We only care about the latest commit, thus the destructuring
        commits[project.github] = data[0];
        --count;

        // Only update redux state when we have finished all our requests
        if (count === 0) {
          dispatch(receiveCommits(commits));
        }
      });
  });
};
