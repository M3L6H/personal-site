import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthForm } from '../forms';

const mapStateToProps = (state, ownProps)  => ({
  currentUser: state.entities.users[state.session.currentUserId],
  ...ownProps
});

export default (Component, options={}) => {
  const { isAdmin } = options;

  return connect(mapStateToProps, null)((props) => {
    const [open, setOpen] = useState(true);
    
    if (props.currentUser) {
      if (!isAdmin || currentUser.admin) {
        return (
          <Component { ...props } />
        );
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return (
        <AuthForm 
          type="signin"
          open={ open }
          setOpen={ setOpen }
          obstruct={ true }
          message={ <>
            You must be signed in to access this resource! <Link to="/">Click here</Link> to return home.
          </> }
        />
      );
    }
  });
};
