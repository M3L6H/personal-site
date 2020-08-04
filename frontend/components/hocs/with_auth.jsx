import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth } from '../forms';

const mapStateToProps = (state, ownProps)  => ({
  currentUser: state.entities.users[state.session.currentUserId],
  ...ownProps
});

export default (Component, options={}) => {
  const { isAdmin } = options;

  return connect(mapStateToProps, null)((props) => {
    const [open, setOpen] = useState(true);
    
    if (props.currentUser) {
      return (
        <Component { ...props } />
      );
    } else {
      return (
        <Auth 
          type="signin"
          open={ open }
          setOpen={ setOpen }
        />
      );
    }
  });
};
