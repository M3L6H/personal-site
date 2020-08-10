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
    .then(({ data }) => dispatch(receiveUser(data)))
    .catch(err => dispatch(receiveUsersErrors(err.response.data)))
);

export const deleteUser = (userId) => dispatch => (
  UsersUtil.deleteUser(userId)
    .then(({ data }) => dispatch(removeUser(data)))
    .catch(err => dispatch(receiveUsersErrors(err.response.data)))
);

export const updateUser = (userData) => dispatch => (
  UsersUtil.updateUser(userData)
    .then(({ data }) => dispatch(receiveUser(data)))
    .catch(err => dispatch(receiveUsersErrors(err.response.data)))
);
