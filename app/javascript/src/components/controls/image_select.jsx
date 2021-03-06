import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react';

import withWindowDimensions from '../hocs/with_window_dimensions';

const ImageSelect = (props) => {
  const { value, onChange, computer } = props;

  const imageInputRef = useRef(null);
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
      <Segment
        style={{ marginTop: 0 }}
      >
        <div className="project-image-container">
          <Image
            className="project-image"
            src={ photoUrl }
          />
        </div>

        <Divider />

        <Button 
          primary
          onClick={ e => {
            e.preventDefault();
            e.stopPropagation();
            imageInputRef.current.dispatchEvent("click");
          } }
        >
          Change Image
        </Button>
      </Segment>
    );
  } else {
    const buttonOption = (
      <>
        <Header icon>
          <Icon name="file image outline" style={{ height: "auto" }} />
          Select an image
        </Header>

        <Button 
          primary
          onClick={ e => {
            e.preventDefault();
            e.stopPropagation();
            imageInputRef.current.dispatchEvent("click");
          } }
        >
          Add Image
        </Button>
      </>
    );

    if (isDragActive) {
      contents = (
        <Header icon>
          <Icon name="target" />
          Drop image here
        </Header>
      );
    } else {
      if (computer) {
        contents = (
          <Grid columns={ 2 } textAlign="center" divided>
            <Divider vertical>Or</Divider>
  
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                { buttonOption }
              </Grid.Column>
  
              <Grid.Column>
                <Header icon>
                  <Icon name="hand pointer" />
                  Drag and drop an image
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
      } else {
        contents = buttonOption;
      }
    }
  }

  return (
    <div
      { ...getRootProps() }
    >
      <Segment 
        placeholder 
        loading={ loading }
        style={{ marginTop: 0 }}
        color={ isDragActive ? "blue" : null }
      >
        { contents }

        <input 
          { ...getInputProps({
            ref: imageInputRef,
            type: "file",
            accept: "image/png, image/jpeg",
            style: { display: "none" },
            onChange: e => handleFiles(e.currentTarget.files, e) 
          }) }
        />
      </Segment>
    </div>
  );
};

export default withWindowDimensions(ImageSelect);
