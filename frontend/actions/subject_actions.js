import * as APIUtil from '../util/subject_util';

export const RECEIVE_SUBJECT = "RECEIVE_SUBJECT";

export const receiveSubject = ({ user }) => ({
  type: RECEIVE_SUBJECT,
  subject: user
});

export const fetchSubject = () => dispatch => (
  APIUtil.fetchSubject()
    .then(res => dispatch(receiveSubject(res)))
);
