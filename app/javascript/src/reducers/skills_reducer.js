import { RECEIVE_SKILL, REMOVE_SKILL } from '../actions/skills_actions';
import { RECEIVE_SUBJECT } from '../actions/subject_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SUBJECT:
      return action.skills;
    case RECEIVE_SKILL:
      return { ...state, [action.skill.id]: action.skill };
    case REMOVE_SKILL:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
