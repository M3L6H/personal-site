import React, { useState } from 'react';

import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Message,
  Segment,
  TextArea
} from 'semantic-ui-react';

import { LimitedInput } from '../controls';

export default ({ type }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  
  let actionText = "Create Project";

  if (type === "edit") {
    actionText = "Update Project";
  }
  
  return (
    <Container text>
      <Message attached="top">
        <Header as="h2" content={ actionText } />
      </Message>
      <Form className="attached segment bottom">
        <Form.Field
          required={ type !== "edit" }
        >
          <label>Title</label>
          <LimitedInput 
            limit={ 64 } 
            placeholder="My Awesome Project" 
            value={ title }
            onChange={ (_, { value }) => setTitle(value) }
          />
        </Form.Field>
        <Form.Field
          control={ TextArea }
          label="Description"
          placeholder="My Awesome Project is a..."
          required={ type !== "edit" }
          value={ description }
          onChange={ (_, { value }) => setDescription(value) }
        />
        <Form.Field
          control={ TextArea }
          label="Summary"
          placeholder={ description.slice(0, 1024) || "My Awesome Project is a..." }
          value={ summary }
          onChange={ (_, { value }) => setSummary(value) }
        />
        <Segment placeholder>
          <Header icon>
            <Icon name="file image outline" />
            No image has been selected
          </Header>
          <Button primary>Add Image</Button>
        </Segment>
        <Button type="submit" fluid positive >
          { actionText }          
        </Button>
      </Form>
    </Container>
  );
};
