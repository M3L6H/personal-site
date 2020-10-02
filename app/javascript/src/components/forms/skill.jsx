import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  createSkill, 
  updateSkill,
  deleteSkill,
  RECEIVE_SKILLS_ERRORS
} from '../../actions/skills_actions';

import { Button, Form, Header, Icon, Label, Segment, Select } from 'semantic-ui-react';

import { CATEGORIES, COLORS } from '../../util/constants';
import capitalize from '../../util/capitalize';

const examples = ["C++", "React", "Rails", "Ruby", "Unity"];

const SkillForm = ({ skills, createSkill, updateSkill, deleteSkill, errors }) => {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [updating, setUpdating] = useState(null);

  const cancelUpdate = () => {
    setSkill("");
    setUpdating(null);
  };

  const submit = () => {
    if (!updating) {
      createSkill({ name: skill, category })
        .then(({ type }) => {
          if (type !== RECEIVE_SKILLS_ERRORS) {
            setSkill("");
          }
        });
    } else {
      updateSkill({ id: updating.id, name: skill, category })
        .then(({ type }) => {
          if (type !== RECEIVE_SKILLS_ERRORS) {
            cancelUpdate();
          }
        });
    }
  }

  return (
    <Segment>
      <Header as="h2">Skills{ updating && <> (Updating) <Button color="red" size="tiny" compact onClick={ cancelUpdate }>Cancel</Button></> }</Header>
      <Form onSubmit={ submit }>
        <Form.Field
          label="Category"
          control={ Select }
          options={ CATEGORIES.map(category => (
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
            as="a"
            key={ skill.id } 
            color={ COLORS[CATEGORIES.indexOf(skill.category)] }
            onClick={ () => {
              setSkill(skill.name);
              setCategory(skill.category);
              setUpdating(skill);
            } }
          >
            { skill.name }
            <Icon 
              name="delete"
              link
              onClick={ (e) => {
                e.stopPropagation();
                deleteSkill(skill.id);
              } }
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
