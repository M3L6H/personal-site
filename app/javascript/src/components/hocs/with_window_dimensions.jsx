import React, { useContext } from "react";
import { WindowContext } from "../providers/window_dimensions";

const withWindowDimensions = (Component) => {
  const WithWindowDimensionsWrapper = props => {
    const window = useContext(WindowContext);
    
    const childProps = {
      ...window,
      ...props
    };

    return <Component { ...childProps } />;
  };

  WithWindowDimensionsWrapper.displayName = "WithWindowDimensionsWrapper";
  
  return WithWindowDimensionsWrapper;
};


export default withWindowDimensions;
