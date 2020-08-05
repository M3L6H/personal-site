import React from 'react';

import { ERROR, SUCCESS } from '../../actions/flash_actions';

import { Message } from 'semantic-ui-react';

export default ({ flash, clearFlash }) => {
  const { message, type, hidden } = flash;

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
