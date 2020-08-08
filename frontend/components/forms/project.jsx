import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createProject, RECEIVE_PROJECT_ERRORS } from '../../actions/projects_actions';
import { receiveFlash, SUCCESS } from '../../actions/flash_actions';

import TextareaAutosize from 'react-textarea-autosize';
import {
  Button,
  Form,
  Header,
  Input,
  Segment
} from 'semantic-ui-react';

import { ImageSelect, LimitedInput, LimitedTextarea } from '../controls';

const ProjectForm = ({ type, createProject, setFlash }) => {
  const [title, setTitle] = useState("");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [photo, setPhoto] = useState(null);
  
  let actionText = "Create Project";

  if (type === "edit") {
    actionText = "Update Project";
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project[title]", title);
    formData.append("project[live]", live);
    formData.append("project[github]", github);
    formData.append("project[description]", description);
    formData.append("project[summary]", summary || description.slice(0, 1024));
    formData.append("project[photo]", photo);

    const message = `Project ${ type !== "edit" ? "created" : "updated" } successfully`;

    createProject(formData)
      .then(({ type }) => {
        if (type !== RECEIVE_PROJECT_ERRORS) {
          setTitle("");
          setDescription("");
          setSummary("");
          setPhoto(null);
          setFlash({
            message,
            type: SUCCESS
          });
        }
      });
  };

  return (
    <>
      <Segment attached="top">
        <Header as="h2" content={ actionText } />
      </Segment>
      <Form onSubmit={ handleSubmit } className="attached segment bottom">
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
          <label>Github</label>
          <Input
            placeholder="github.com/M3L6H/example"
            value={ github }
            onChange={ (_, { value }) => setGithub(value) }
          />
        </Form.Field>

        <Form.Field>
          <label>Live</label>
          <Input
            placeholder="example.herokuapp.com"
            value={ live }
            onChange={ (_, { value }) => setLive(value) }
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

        <Form.Field>
          <label>Cover Image</label>
          <ImageSelect
            value={ photo }
            onChange={ (_, { value }) => setPhoto(value) }
          />
        </Form.Field>

        <Button 
          type="submit" 
          fluid 
          positive
          disabled={ !title || !description || !photo }
        >
          { actionText }          
        </Button>
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFlash: msg => dispatch(receiveFlash(msg)),
  createProject: projectData => dispatch(createProject(projectData)),
  ...ownProps
});

export default connect(null, mapDispatchToProps)(ProjectForm);
