import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Form, Modal } from 'semantic-ui-react';

import { createSession } from '../../actions/session_actions';

const Auth = ({ type, open, setOpen, signIn, signUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let actionText = "Sign In";
  let action = signIn;

  if (type === "signup") {
    actionText = "Sign Up";
    action = signUp;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    action({ username, password });
  };

  return (
    <Modal
      onClose={ () => setOpen(false) }
      onOpen={ () => setOpen(true) }
      open={ open }
    >
      <Modal.Header>{ actionText }</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={ handleSubmit }>
            <Form.Input 
              label="Username or Email"
              placeholder="jane.doe@example.com"
              required={ type === "signup" }
              value={ username }
              onChange={ (_, { value }) => setUsername(value) }
            />
            <Form.Input 
              label="Password"
              type="password"
              required={ type === "signup" }
              value={ password }
              onChange={ (_, { value }) => setPassword(value) }
            />
            <Button 
              fluid
              positive
              type="submit"
            >{ actionText }</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (_, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (user) => dispatch(createSession(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
