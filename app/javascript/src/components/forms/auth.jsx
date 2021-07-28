import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Form,
  Header,
  Icon,
  Message,
  Modal,
  Segment
} from "semantic-ui-react";

import { createSession } from "../../actions/session_actions";

const Auth = ({ type, open, setOpen, signIn, signUp, message, obstruct, errors }) => {
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

  const className = `attached segment${ message ? "" : " bottom" }`;

  return (
    <Modal
      basic
      onClose={ () => setOpen(false) }
      onOpen={ () => setOpen(true) }
      open={ open }
      closeOnEscape={ !obstruct }
      closeOnDimmerClick={ !obstruct }
      dimmer="blurring"
    >
      <Modal.Content>
        <Modal.Description>
          <Segment attached="top">
            <Header as="h2" content={ actionText } />
          </Segment>
          <Form onSubmit={ handleSubmit } className={ className }>
            <Form.Input 
              label="Username or Email"
              placeholder="jane.doe@example.com"
              required={ type === "signup" }
              value={ username }
              onChange={ (_, { value }) => setUsername(value) }
              error={ errors && "username" in errors && {
                content: errors.username,
                pointing: "below"
              }}
            />
            <Form.Input 
              label="Password"
              type="password"
              required={ type === "signup" }
              value={ password }
              onChange={ (_, { value }) => setPassword(value) }
              error={ errors && "password" in errors && {
                content: errors.password,
                pointing: "below"
              }}
            />
            <Button 
              fluid
              positive
              type="submit"
            >{ actionText }</Button>
          </Form>
          { message &&
            <Message attached="bottom" warning icon>
              <Icon name="warning" />
              <Message.Content>
                { message }
              </Message.Content>
            </Message>
          }
          {
            errors && "error" in errors &&
            <Message attached="bottom" error icon>
              <Icon name="warning" />
              <Message.Content>{ errors.error }</Message.Content>
            </Message>
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ errors: { session } }, ownProps) => ({
  errors: session,
  ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (user) => dispatch(createSession(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
