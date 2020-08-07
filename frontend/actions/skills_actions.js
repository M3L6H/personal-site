import * as APIUtil from '../util/skills_util';

export const RECEIVE_SKILL = "RECEIVE_SKILL";
export const REMOVE_SKILL = "REMOVE_SKILL";
export const RECEIVE_SKILLS_ERORRS = "RECEIVE_SKILL_ERRORS";

export const receiveSkill = ({ skill }) => ({
  type: RECEIVE_SKILL,
  skill
});

export const removeSkill = ({ id }) => ({
  type: REMOVE_SKILL,
  id
});

export const receiveSkillErrors = (errors) => ({
  type: RECEIVE_SKILL_ERORRS,
  errors
});

export const createSkill = skill => dispatch => (
  APIUtil.createSkill(skill)
    .then(res => dispatch(receiveSkill(res)))
    .fail(jqXHR => dispatch(receiveSkillErrors(jqXHR.responseJSON)))
);

export const updateSkill = skill => dispatch => (
  APIUtil.updateSkill(skill)
    .then(res => dispatch(receiveSkill(res)))
    .fail(jqXHR => dispatch(receiveSkillErrors(jqXHR.responseJSON)))
);

export const deleteSkill = id => dispatch => (
  APIUtil.deleteSkill(id)
    .then(res => dispatch(removeSkill(res)))
    .fail(jqXHR => dispatch(receiveSkillErrors(jqXHR.responseJSON)))
);
