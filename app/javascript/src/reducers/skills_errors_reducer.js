import { 
  RECEIVE_SKILLS_ERRORS, 
  RECEIVE_SKILL, 
  REMOVE_SKILL 
} from "../actions/skills_actions";

export default (state={}, { type, errors }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_SKILLS_ERRORS:
      return errors;
    case RECEIVE_SKILL:
    case REMOVE_SKILL:
      return {};
    default:
      return state;
  }
};