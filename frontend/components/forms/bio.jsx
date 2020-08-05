import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { receiveFlash, ERROR, SUCCESS } from '../../actions/flash_actions';
import { updateUser, RECEIVE_USERS_ERRORS } from '../../actions/users_actions';
import debounce from '../../util/debouncer';

import TextareaAutosize from 'react-textarea-autosize';
import { Form, Header, Segment } from 'semantic-ui-react';

let saveBio;

const BioForm = ({ user, updateUser, setFlash }) => {
  // Should never happen, but just in case
  if (!user) return null;
  
  const didMountRef = useRef(false);
  const [bio, setBio] = useState(user.bio);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    saveBio = debounce((bio) => {
      updateUser({ ...user, bio })
        .then(({ type }) => {
          if (type === RECEIVE_USERS_ERRORS) {
            setFlash({
              message: "There was an error saving the bio",
              type: ERROR
            });
          } else {
            setFlash({
              message: "Bio saved successfully",
              type: SUCCESS
            });
          }

          setSaving(false);
        });
    }, 3000);

    return saveBio;
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      saveBio(bio);
      setSaving(true);
    } else {
      didMountRef.current = true;
    }
  }, [bio]);

  return (
    <>
      <Segment attached="top">
        <Header as="h2">
          Bio
        </Header>
      </Segment>
      <Form className="segment attached bottom">
        <TextareaAutosize
          minRows={ 5 }
          rows={ 5 }
          maxRows={ 10 }
          placeholder="You currently don't have a bio. You should add one!"
          value={ bio }
          onChange={ e => {
            setBio(e.currentTarget.value);
          } }
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
