import * as SessionUtil from "../util/session_util";

export const RECEIVE_SESSION = "RECEIVE_SESSION";
export const REMOVE_SESSION = "REMOVE_SESSION";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveSession = ({ user }) => ({
  type: RECEIVE_SESSION,
  userId: user.id,
  user
});

const removeSession = () => ({
  type: REMOVE_SESSION
});

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  session: errors
});

export const createSession = (user) => dispatch => (
  SessionUtil.createSession(user)
    .then(({ data }) => dispatch(receiveSession(data)))
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
);

export const deleteSession = () => dispatch => (
  SessionUtil.deleteSession()
    .then(() => dispatch(removeSession()))
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
);
