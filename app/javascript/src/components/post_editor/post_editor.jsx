import React, { useMemo, useState } from 'react';

import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react';

const PostEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph."}]
    }
  ]);

  return (
    <Slate
      editor={ editor }
      value={ value }
      onChange={ setValue }
    >
      <Editable />
    </Slate>
  );
};

export default PostEditor;
