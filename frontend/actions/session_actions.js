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
    .then(res => dispatch(receiveSession(res)))
    .fail(jqXHR => dispatch(receiveSessionErrors(jqXHR.responseJSON)))
);

export const deleteSession = () => dispatch => (
  SessionUtil.deleteSession()
    .then(() => dispatch(removeSession()))
    .fail(jqXHR => dispatch(receiveSessionErrors(jqXHR.responseJSON)))
);
