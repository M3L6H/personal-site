import * as APIUtil from "../util/subject_util";

import { fetchCommits } from "./github_actions";

export const RECEIVE_SUBJECT = "RECEIVE_SUBJECT";

export const receiveSubject = ({ user, skills, projects }) => ({
  type: RECEIVE_SUBJECT,
  subject: user,
  skills,
  projects
});

export const fetchSubject = () => dispatch => (
  APIUtil.fetchSubject()
    .then(res => {
      dispatch(receiveSubject(res.data));
      dispatch(fetchCommits(res.data.projects));
    })
);
