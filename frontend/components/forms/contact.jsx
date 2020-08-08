import React, { useState } from 'react';

import { Button, Form, Input } from 'semantic-ui-react';

import TextareaAutosize from 'react-textarea-autosize';

export default (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
  };
  
  return (
    <Form
      onSubmit={ handleSubmit }
    >
      <Form.Field required>
        <label>Name</label>
        <Input
          placeholder="John Doe"
          value={ name }
          onChange={ (_, { value }) => setName(value) }
        />
      </Form.Field>

      <Form.Field required>
        <label>Email</label>
        <Input
          placeholder="jdoe@example.com"
          value={ email }
          onChange={ (_, { value }) => setEmail(value) }
        />
      </Form.Field>

      <Form.Field required>
        <label>Message</label>
        <TextareaAutosize
          minRows={ 3 }
          rows={ 3 }
          maxRows={ 10 }
          placeholder="Message goes here..."
          value={ message }
          onChange={ (e) => setMessage(e.currentTarget.value) }
        />
      </Form.Field>

      <Button 
        type="submit" 
        fluid 
        positive
        disabled={ !name || !email || !message }
      >
        Contact Me
      </Button>
    </Form>
  );
};
