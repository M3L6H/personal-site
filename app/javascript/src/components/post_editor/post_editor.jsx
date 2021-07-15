import React, { useMemo, useRef, useState } from "react";
import { withAuth } from "../hocs";

import { 
  Container, 
  Header, 
  Input,
  Segment
} from "semantic-ui-react";

import { createEditor } from "slate";

import { Slate, Editable, withReact } from "slate-react";

const PostEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const saveTimeout = useRef(null);

  const [title, setTitle] = useState("");
  const [document, setDocument] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph."}]
    }
  ]);

  const handleChange = (e, other) => {
    let val;
    
    switch(e.currentTarget.data["type"]) {
      case "title":
        val = e.currentTarget.value;
        setTitle(e.currentTarget.value);
        break;
      case "document":
        val = other.value || e.currentTarget.value;
        setDocument(val);
        break;
      default:
        return;
    }

    // setSaving(true);
    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      // const formData = new FormData();
      // formData.append("user[id]", user.id);
      // formData.append("user[bio]", val);
      
      // updateUser(formData)
      //   .then(({ type }) => {
      //     if (type === RECEIVE_USERS_ERRORS) {
      //       setFlash({
      //         message: "There was an error saving the bio",
      //         type: ERROR
      //       });
      //     } else if (didMountRef.current) {
      //       setFlash({
      //         message: "Bio saved successfully",
      //         type: SUCCESS
      //       });
      //     }
    
      //     if (didMountRef.current) setSaving(false);
      //   });
    }, 1200);
  };

  return (
    <Container text className="post-editor">
      <Header as="h1">Create Post</Header>
      <Input
        placeholder="Title"
        fluid
        value={ title }
        onChange={ handleChange }
      />
      <Segment className="document-editor">
        <Slate
          editor={ editor }
          value={ document }
          onChange={ handleChange }
        >
          <Editable />
        </Slate>
      </Segment>
    </Container>
  );
};

export default withAuth(PostEditor, { requireAdmin: true });
