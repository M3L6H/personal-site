import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { receiveFlash, ERROR, SUCCESS } from '../../actions/flash_actions';
import { updateUser, RECEIVE_USERS_ERRORS } from '../../actions/users_actions';

import {
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react';

const ProfilePhotoForm = ({ user, setFlash, updateUser }) => {
  const [value, setValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files) => {
    const file = files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setValue(file);

      setLoading(false);
      setPhotoUrl(fileReader.result);

      const formData = new FormData();
      formData.append("user[id]", user.id);
      formData.append("user[photo]", file);
  
      updateUser(formData)
        .then((res) => {
          if (res.type !== RECEIVE_USERS_ERRORS) {
            setFlash({
              message: "Successfully saved profile photo",
              type: SUCCESS
            });
          } else {
            setFlash({
              message: "Failed to save profile photo",
              type: ERROR
            });
          }
        });
    };

    if (file) {
      fileReader.readAsDataURL(file);
      setLoading(true);
    }
  };

  const onDrop = useCallback(handleFiles, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  let contents;
  
  if (value && !loading) {
    contents = (
      <div className="profile-photo-container">
        <Image
          className="profile-photo"
          src={ photoUrl }
        />
        <div className="profile-photo-msg">
          Click to change
        </div>
      </div>
    );
  } else {
    if (isDragActive) {
      contents = <Icon name="target" size="big" />;
    } else {
      contents = (
        <Icon name="file image outline" size="big" style={{ height: "auto" }} />
      );
    }
  }

  return (
    <Grid columns={ 2 } verticalAlign="middle">
      <Grid.Column>
        <Header as="h2" inverted>Profile photo</Header>
      </Grid.Column>
      <Grid.Column className="profile-photo-column">
        <div
          { ...getRootProps() }
        >
          <Segment 
            className="profile-photo-segment"
            placeholder
            circular
            loading={ loading }
            color={ isDragActive ? "blue" : null }
          >
            { contents }

            <input 
              { ...getInputProps({
                className: "image-input",
                type: "file",
                accept: "image/png, image/jpeg",
                style: { display: "none" },
                onChange: (e) => handleFiles(e.currentTarget.files) 
              }) }
            />
          </Segment>
        </div>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ entities, session }) => ({
  user: entities.users[session.currentUserId]
});

const mapDispatchToProps = (dispatch) => ({
  setFlash: msg => dispatch(receiveFlash(msg)),
  updateUser: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotoForm);
