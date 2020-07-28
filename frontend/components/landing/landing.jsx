import React from 'react';

import { Container, Header } from 'semantic-ui-react';

export default function Landing() {
  return (
    <section className="landing">
      <Container text>
        <Header as="h2">
          <span id="hi">Hi, </span>
          <span id="my-name-is">my name is</span>
        </Header>
        <Header as="h2" className="primary">Michael Hollingworth</Header>
        <Header as="h2">
          <span id="and-i-am-a">and I am a</span>
        </Header>
        <Header as="h2" className="primary" id="title">Software Engineer</Header>
      </Container>
    </section>
  );
}
