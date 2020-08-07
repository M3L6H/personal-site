import * as UsersUtil from "../util/users_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_USERS_ERRORS = "RECEIVE_USERS_ERRORS";

const receiveUser = ({ user }) => ({
  type: RECEIVE_USER,
  user
});

const removeUser = ({ id }) => ({
  type: REMOVE_USER,
  user: { id }
});

const receiveUsersErrors = (errors) => ({
  type: RECEIVE_USERS_ERRORS,
  errors
});

export const fetchUser = (userId) => dispatch => (
  UsersUtil.fetchUser(userId)
    .then(res => dispatch(receiveUser(res)))
    .fail(jqXHR => dispatch(receiveUsersErrors(jqXHR.responseJSON)))
);

export const deleteUser = (userId) => dispatch => (
  UsersUtil.deleteUser(userId)
    .then(res => dispatch(removeUser(res)))
    .fail(jqXHR => dispatch(receiveUsersErrors(jqXHR.responseJSON)))
);

export const updateUser = (userData) => dispatch => (
  UsersUtil.updateUser(userData)
    .then(res => dispatch(receiveUser(res)))
    .fail(jqXHR => dispatch(receiveUsersErrors(jqXHR.responseJSON)))
);
