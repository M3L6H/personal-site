import { combineReducers } from 'redux';

import projects from './projects_reducer';
import skills from './skills_reducer';
import subject from './subject_reducer';
import users from './users_reducer';

export default combineReducers({
  projects,
  skills,
  subject,
  users
});