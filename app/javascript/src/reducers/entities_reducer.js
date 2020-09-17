import { combineReducers } from 'redux';

import commits from './commits_reducer';
import posts from './posts_reducer';
import projects from './projects_reducer';
import skills from './skills_reducer';
import subject from './subject_reducer';
import tags from './tags_reducer';
import taggings from './taggings_reducer';
import users from './users_reducer';

export default combineReducers({
  commits,
  posts,
  projects,
  skills,
  subject,
  tags,
  taggings,
  users
});