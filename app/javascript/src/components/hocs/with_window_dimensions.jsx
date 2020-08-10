import React, { useContext } from 'react';
import { WindowContext } from '../providers/window_dimensions';

export default (Component) => {
  return props => {
    const window = useContext(WindowContext);
    
    const childProps = {
      ...window,
      ...props
    };

    return <Component { ...childProps } />;
  };
};