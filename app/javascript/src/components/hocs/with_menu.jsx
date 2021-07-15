import React from "react";

import { Segment } from "semantic-ui-react";

const WithMenu = (Component, Menu) => {
  const WithMenuWrapper = (props) => {
    return (
      <>
        <Menu attached="top" />
        <Segment attached="bottom" inverted={ props.inverted }>
          <Component { ...props } />
        </Segment>
      </>
    );
  };

  WithMenuWrapper.displayName = "WithMenuWrapper";
  
  return WithMenuWrapper;
};

WithMenu.displayName = "WithMenu";

export default WithMenu;
