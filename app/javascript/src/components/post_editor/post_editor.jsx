import React, { useMemo, useState } from 'react';

import { 
  Container, 
  Header, 
  Input 
} from 'semantic-ui-react';

import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';

const PostEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph."}]
    }
  ]);

  return (
    <Container>
      <Header as="h1">Create Post</Header>
      <Input
        placeholder="Title"
        fluid
        value={ title }
        onChange={ (_, { value }) => setTitle(value) }
      />
      <Slate
        editor={ editor }
        value={ value }
        onChange={ setValue }
      >
        <Editable />
      </Slate>
    </Container>
  );
};

export default PostEditor;
