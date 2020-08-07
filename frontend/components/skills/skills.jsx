import React, { useState } from 'react';

import { Button, Header, Segment } from 'semantic-ui-react';

import { CATEGORIES, COLORS } from '../../util/constants';
import capitalize from '../../util/capitalize';

export default ({ skills }) => {
  const [active, setActive] = useState(0b000);

  return (
    <>
      <Header as="h2" attached="top">
        Skills
      </Header>
      <Segment attached="bottom">
        <Segment basic>
          <Button
            toggle
            active={ active === 0 }
            onClick={ () => setActive(0b000) }
          >
            All
          </Button>
          <Button.Group>
            { CATEGORIES.map((category, idx) => {
              const mask = 1 << idx;
              return (
                <Button
                  key={ category }
                  toggle
                  active={ (active & mask) === mask }
                  onClick={ () => setActive(active ^ mask) }
                >
                  { capitalize(category) }
                </Button>
              );
            }) }
          </Button.Group>
        </Segment>
      </Segment>
    </>
  );
};
