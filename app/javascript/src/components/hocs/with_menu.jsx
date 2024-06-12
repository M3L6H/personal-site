import React from "react";

import { Segment } from "semantic-ui-react";

export default (Component, Menu) => {
  return (props) => {
    return (
      <>
        <Menu attached="top" />
        <Segment attached="bottom" inverted={ props.inverted }>
          <Component { ...props } />
        </Segment>
      </>
    );
  };
};
