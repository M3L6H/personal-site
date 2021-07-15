import React, { useContext } from "react";
import { WindowContext } from "../providers/window_dimensions";

const WithWindowDimensions = (Component) => {
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

WithWindowDimensions.displayName = "WithWindowDimensions";

export default WithWindowDimensions;
