import React, { useState } from 'react';

import { Button, Container, Header, Label, Segment } from 'semantic-ui-react';

import { CATEGORIES, COLORS } from '../../util/constants';
import capitalize from '../../util/capitalize';

const compare = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name === b.name) return 0;
  return 1;
};

export default ({ skills }) => {
  const [active, setActive] = useState(0b000);

  // Sort the skills
  skills.sort(compare);

  return (
    <Container className="skills">
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

        { skills.map(({ category, id, name }) => (
          <Label
            key={ id }
            color={ COLORS[CATEGORIES.indexOf(category)] }
            size="large"
            className={ `skill ${ active === 0 || (active >> CATEGORIES.indexOf(category) & 1 === 1) ? "" : " hide" }` }
          >
            { name }
          </Label>
        )) }
      </Segment>
    </Container>
  );
};