import React from 'react';

import { Container, Header } from 'semantic-ui-react';

export default (props) => {
  return (
    <section className="about">
      <Container text>
        <Header as="h2">About</Header>
      </Container>
    </section>
  );
};
