import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react';

export default (props) => {
  const { value, onChange, computer } = props;

  const [stateValue, setStateValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files, e) => {
    const file = files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      if (!onChange) {
        setStateValue(file);
      }

      setLoading(false);
      setPhotoUrl(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
      setLoading(true);
    }

    if (onChange) {
      onChange(e, { value: file });
    }
  };

  const onDrop = useCallback(handleFiles, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const val = value || stateValue;
    
  let contents;
  
  if (val && !loading) {
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
                onChange: e => handleFiles(e.currentTarget.files, e) 
              }) }
            />
          </Segment>
        </div>
      </Grid.Column>
    </Grid>
  );
};
