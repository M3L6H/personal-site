import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps)  => ({
  currentUser: state.entities.users[state.session.currentUserId],
  ...ownProps
});

export default (Component, options={}) => {
  const { isAdmin } = options;

  return connect(mapStateToProps, null)((props) => {
    if (props.currentUser && (!isAdmin || props.currentUser.admin)) {
      return (
        <Component { ...props } />
      );
    } else {
      return (
        <Redirect to="/" />
      );
    }
  });
};
