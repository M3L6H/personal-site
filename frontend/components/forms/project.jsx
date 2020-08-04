import React, { useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';

import { LimitedInput, LimitedTextarea } from '../controls';

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
        <Form.Field required={ type !== "edit" }>
          <label>Title</label>
          <LimitedInput
            limit={ 64 }
            placeholder="My Awesome Project"
            value={ title }
            onChange={ (_, { value }) => setTitle(value) }
          />
        </Form.Field>

        <Form.Field required={ type !== "edit" }>
          <label>Description</label>
          <TextareaAutosize
            minRows={ 3 }
            rows={ 3 }
            maxRows={ 10 }
            placeholder="My Awesome Project is a..."
            value={ description }
            onChange={ (e) => setDescription(e.currentTarget.value) }
          />
        </Form.Field>

        <Form.Field>
          <label>Summary</label>
          <LimitedTextarea
            minRows={ 3 }
            rows={ 3 }
            maxRows={ 10 }
            limit={ 1024 }
            placeholder={ description.slice(0, 1024) || "My Awesome Project is a..." }
            value={ summary }
            onChange={ (e) => setSummary(e.currentTarget.value) }
          />
        </Form.Field>

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
