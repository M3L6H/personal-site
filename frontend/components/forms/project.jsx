import React from 'react';

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
        <Form.Field>
          <label>Title</label>
          <LimitedInput limit={ 64 } placeholder="My Awesome Project" />
        </Form.Field>
        <Form.Field
          control={ TextArea }
          label="Description"
          placeholder="My Awesome Project is a..."
        />
        <Form.Field
          control={ TextArea }
          label="Summary"
          placeholder="My Awesome Project is a..."
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
