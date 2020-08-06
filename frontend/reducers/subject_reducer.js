import { RECEIVE_SUBJECT } from '../actions/subject_actions';

export default (state={}, { type, subject }) => {
  Object.freeze(state);

  switch(type) {
    case RECEIVE_SUBJECT:
      return subject;
    default:
      return state;
  }
};
