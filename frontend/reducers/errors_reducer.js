import { combineReducers } from 'redux';

import flash from './flash_reducer';
import session from './session_errors_reducer';
import users from './users_errors_reducer';

export default combineReducers({
  flash,
  session,
  users
});