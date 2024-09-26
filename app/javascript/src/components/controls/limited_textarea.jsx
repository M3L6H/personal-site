import React, { useState } from "react";
import PropTypes from "prop-types";

import TextareaAutosize from "react-textarea-autosize";
import { Label } from "semantic-ui-react";

const LimitedTextarea = (props) => {
  const { limit, value, onChange } = props;
  const [stateValue, setStateValue] = useState("");

  const val = value || stateValue;
  
  return (
    <div className="limited-textarea">
      <TextareaAutosize 
        { ...props } 
        value={ val } 
        onChange={ onChange || ((_, { value }) => setStateValue(value)) }
      />
      <Label 
        size="tiny" 
        floating
        color={ val.length <= limit ? null : "red" }
      >
        { limit - (val).length }
      </Label>
    </div>
  );
};

LimitedTextarea.propTypes = {
  limit: PropTypes.number.isRequired
};

export default LimitedTextarea;
