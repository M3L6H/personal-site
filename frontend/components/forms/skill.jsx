import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  createSkill, 
  updateSkill,
  deleteSkill,
  RECEIVE_SKILLS_ERRORS
} from '../../actions/skills_actions';

import { Form, Header, Icon, Label, Segment, Select } from 'semantic-ui-react';

const examples = ["C++", "React", "Rails", "Ruby", "Unity"];
const categories = ["language", "technology", "concepts"];
const colors = ["green", "blue", "orange"];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const SkillForm = ({ skills, createSkill, updateSkill, deleteSkill, errors }) => {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const submit = () => {
    createSkill({ name: skill, category })
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
        <Form.Field
          label="Category"
          control={ Select }
          options={ categories.map(category => (
            { key: category, value: category, text: capitalize(category)}
          )) }
          value={ category }
          onChange={ (_, { value }) => setCategory(value) }
          error={ errors.category && {
            content: errors.category.join("\n"),
            pointing: "below"
          } }
        />
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
          <Label 
            key={ skill.id } 
            color={ colors[categories.indexOf(skill.category)] }
          >
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
