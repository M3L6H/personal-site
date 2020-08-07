import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import skills from './skills_errors_reducer';
import users from './users_errors_reducer';

export default combineReducers({
  session,
  skills,
  users
});