import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  createSkill, 
  updateSkill,
  deleteSkill,
  RECEIVE_SKILLS_ERRORS
} from '../../actions/skills_actions';

import { Form, Header, Icon, Label, Segment } from 'semantic-ui-react';

const examples = ["C++", "React", "Rails", "Ruby", "Unity"];

const SkillForm = ({ skills, createSkill, updateSkill, deleteSkill, errors }) => {
  const [skill, setSkill] = useState("");

  const submit = () => {
    createSkill({ name: skill })
      .then(({ type }) => {
        if (type !== RECEIVE_SKILLS_ERRORS) {
          setSkill("");
        }
      });
  }

  return (
    <Segment>
      <Header as="h2">Skills</Header>
      <Form onSubmit={ submit }>
        <Form.Input
          placeholder={ examples[Math.floor(Math.random() * examples.length)] }
          onChange={ e => setSkill(e.currentTarget.value) }
          value={ skill }
          icon={ 
            <Icon name="arrow right" circular link onClick={ submit } />
          }
          error={ errors.name && {
            content: errors.name.join("\n"),
            pointing: "below"
          } }
        />
      </Form>
      <Segment>
        { skills.map(skill => (
          <Label key={ skill.id }>
            { skill.name }
            <Icon 
              name="delete"
              link
              onClick={ () => deleteSkill(skill.id) }
            />
          </Label>
        )) }

        { skills.length === 0 && "No skills have been created yet!" }
      </Segment>
    </Segment>
  );
};

const mapStateToProps = state => ({
  skills: Object.values(state.entities.skills),
  errors: state.errors.skills
});

const mapDispatchToProps = dispatch => ({
  createSkill: skill => dispatch(createSkill(skill)),
  updateSkill: skill => dispatch(updateSkill(skill)),
  deleteSkill: id => dispatch(deleteSkill(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillForm);
