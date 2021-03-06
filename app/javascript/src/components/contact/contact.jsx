import React, { forwardRef } from 'react';

import { Container, Header } from 'semantic-ui-react';

import { ContactForm } from '../forms';

export default forwardRef((props, ref) => {
  return (
    <section className="contact" ref={ ref }>
      <Container text>
        <Header size="huge" textAlign="center">Contact</Header>
        <ContactForm />
      </Container>
    </section>
  );
});
