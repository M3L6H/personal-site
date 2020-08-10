import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { receiveFlash, ERROR } from '../../actions/flash_actions';

import { AuthForm } from '../forms';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
  setFlash: flash => dispatch(receiveFlash(flash))
});

export default (Component, options={}) => {
  const { requireAdmin } = options;

  return connect(mapStateToProps, mapDispatchToProps)(withRouter((props) => {
    const [open, setOpen] = useState(true);
    const { currentUser, setFlash, history } = props;
    
    if (currentUser) {
      if (!requireAdmin || currentUser.admin) {
        return (
          <Component { ...props } />
        );
      } else {
        history.push("/");
        setFlash({
          message: "You do not have permission to access that!",
          type: ERROR,
          persist: true
        });
        return null;
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
  }));
};
