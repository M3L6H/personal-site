import * as APIUtil from '../util/skills_util';

export const RECEIVE_SKILL = "RECEIVE_SKILL";
export const REMOVE_SKILL = "REMOVE_SKILL";
export const RECEIVE_SKILLS_ERRORS = "RECEIVE_SKILL_ERRORS";

export const receiveSkill = ({ skill }) => ({
  type: RECEIVE_SKILL,
  skill
});

export const removeSkill = ({ id }) => ({
  type: REMOVE_SKILL,
  id
});

export const receiveSkillErrors = (errors) => ({
  type: RECEIVE_SKILLS_ERRORS,
  errors
});

export const createSkill = skill => dispatch => (
  APIUtil.createSkill(skill)
    .then(({ data }) => dispatch(receiveSkill(data)))
    .catch(err => dispatch(receiveSkillErrors(err.response.data)))
);

export const updateSkill = skill => dispatch => (
  APIUtil.updateSkill(skill)
    .then(({ data }) => dispatch(receiveSkill(data)))
    .catch(err => dispatch(receiveSkillErrors(err.response.data)))
);

export const deleteSkill = id => dispatch => (
  APIUtil.deleteSkill(id)
    .then(({ data }) => dispatch(removeSkill(data)))
    .catch(err => dispatch(receiveSkillErrors(err.response.data)))
);
