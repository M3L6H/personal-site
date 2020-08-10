import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { receiveFlash, ERROR, SUCCESS } from '../../actions/flash_actions';
import { updateUser, RECEIVE_USERS_ERRORS } from '../../actions/users_actions';

import TextareaAutosize from 'react-textarea-autosize';
import {
  Form,
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react';

const BioForm = ({ user, updateUser, setFlash }) => {
  // Should never happen, but just in case
  if (!user) return null;
  
  const didMountRef = useRef(false);
  const saveTimeout = useRef(null);
  const [bio, setBio] = useState(user.bio);
  const [saving, setSaving] = useState(false);

  // Avoid state updates after component is unmounted
  useEffect(() => {
    didMountRef.current = true;
    return () => didMountRef.current = false;
  }, []);

  const handleChange = e => {
    setBio(e.currentTarget.value);
    setSaving(true);
    clearTimeout(saveTimeout.current);

    // Can't reuse e inside of the setTimeout callback
    const val = e.currentTarget.value;

    saveTimeout.current = setTimeout(() => {
      const formData = new FormData();
      formData.append("user[id]", user.id);
      formData.append("user[bio]", val);
      
      updateUser(formData)
        .then(({ type }) => {
          if (type === RECEIVE_USERS_ERRORS) {
            setFlash({
              message: "There was an error saving the bio",
              type: ERROR
            });
          } else if (didMountRef.current) {
            setFlash({
              message: "Bio saved successfully",
              type: SUCCESS
            });
          }
    
          if (didMountRef.current) setSaving(false);
        });
    }, 1200)
  };

  return (
    <>
      <Segment attached="top">
        <Header as="h2" style={{ display: "inline-block" }}>
          Bio
        </Header>
        <Label 
          color={ saving ? "blue" : "green" } 
          ribbon="right"
          style={{
            position: "absolute",
            right: 0,
            left: "auto",
            transform: "none"
          }}
        >
          { saving ? (
            <><Icon name="spinner" loading /> Saving...</>
          ) : (
            <><Icon name="check" /> Saved</>
          ) }
        </Label>
      </Segment>
      <Form className="segment attached bottom">
        <TextareaAutosize
          minRows={ 5 }
          rows={ 5 }
          maxRows={ 10 }
          placeholder="You currently don't have a bio. You should add one!"
          value={ bio }
          onChange={ handleChange }
        />
      </Form>
    </>
  );
};

const mapStateToProps = ({ entities, session }) => ({
  user: entities.users[session.currentUserId]
});

const mapDispatchToProps = (dispatch) => ({
  setFlash: msg => dispatch(receiveFlash(msg)),
  updateUser: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(BioForm);
