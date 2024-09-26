import React, { useState } from "react";
import PropTypes from "prop-types";

import { Input, Label } from "semantic-ui-react";

const LimitedInput = (props) => {
  const { limit, value, onChange } = props;
  const [stateValue, setStateValue] = useState("");

  const val = value || stateValue;
  
  return (
    <Input 
      { ...props } 
      value={ val } 
      onChange={ onChange || ((_, { value }) => setStateValue(value)) }
    >
      <input />
      <Label 
        size="tiny" 
        floating
        color={ val.length <= limit ? null : "red" }
      >
        { limit - (val).length }
      </Label>
    </Input>
  );
};

LimitedInput.propTypes = {
  limit: PropTypes.number.isRequired
};

export default LimitedInput;
