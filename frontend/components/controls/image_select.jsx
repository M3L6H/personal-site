import React, { useState } from 'react';

import {
  Button,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react';

const ImageSelect = (props) => {
  const { value, onChange } = props;
  const [stateValue, setStateValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const val = value || stateValue;

  if (val && !loading) {
    return (
      <Segment
        style={{ marginTop: 0 }}
      >
        <Image
          src={ photoUrl }
        />
      </Segment>
    );
  } else {
    return (
      <Segment 
        placeholder 
        loading={ loading }
        style={{ marginTop: 0 }}
      >
        <Header icon>
          <Icon name="file image outline" />
          No image has been selected
        </Header>
        <Button 
          primary
          onClick={ e => {
            e.preventDefault();
            $(e.currentTarget).parent().find(".image-input").trigger("click");
          } }
        >
          Add Image
        </Button>
        <input 
          className="image-input" 
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }} 
          onChange={ e => {
            const file = e.currentTarget.files[0];
            const fileReader = new FileReader();
        
            fileReader.onloadend = () => {
              if (!onChange) {
                setStateValue(e.currentTarget.files[0]);
              }

              setLoading(false);
              setPhotoUrl(fileReader.result);
            };
        
            if (file) {
              fileReader.readAsDataURL(file);
              setLoading(true);
            }

            if (onChange) {
              onChange(e, { value: e.currentTarget.files[0] });
            }
          } }
        />
      </Segment>
    );
  }
};

export default ImageSelect;
