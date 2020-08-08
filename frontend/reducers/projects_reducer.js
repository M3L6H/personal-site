import { RECEIVE_PROJECT } from '../actions/projects_actions';
import { RECEIVE_SUBJECT } from '../actions/subject_actions';

export default (state={}, { type, project, projects }) => {
  Object.freeze(state);
  
  switch(type) {
    case RECEIVE_SUBJECT:
      return projects;
    case RECEIVE_PROJECT:
      return { ...state, [project.id]: project };
    default:
      return state;
  }
};