import React from "react";
import { withRouter } from "react-router-dom";

import { Button } from "semantic-ui-react";

const editButton = ({ user, history, route }) => {
  if (!user || !user.admin) return null;
  
  return (
    <Button 
      className="edit-button" 
      circular 
      icon="pencil"
      color="blue"
      onClick={ () => history.push(route) }
    />
  );
};

export default withRouter(editButton);
