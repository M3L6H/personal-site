import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import { ERROR, SUCCESS } from '../../actions/flash_actions';

import { Message } from 'semantic-ui-react';

const Flash = ({ flash, clearFlash, location }) => {
  const { message, type, hidden, persist } = flash;

  const prevLocation = useRef();
  useEffect(() => {
    if (!persist && location !== prevLocation.current && !hidden) {
      clearFlash();
    }
    prevLocation.current = location;
  }, [location]);

  return (
    <Message
      className={ `flash${ hidden ? "" : " visible" }` }
      onDismiss={ clearFlash }
      content={ message }
      positive={ type === SUCCESS }
      negative={ type === ERROR }
    />
  );
}

export default withRouter(Flash);
