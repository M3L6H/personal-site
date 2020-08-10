import * as APIUtil from '../util/projects_util';

export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";

export const receiveProject = ({ project }) => ({
  type: RECEIVE_PROJECT,
  project
});

export const receiveProjectErorrs = (errors) => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors
})

export const createProject = (projectData) => (dispatch) => (
  APIUtil.createProject(projectData)
    .then(({ data }) => dispatch(receiveProject(data)))
    .catch(err => dispatch(receiveProjectErorrs(err.response.data)))
);
