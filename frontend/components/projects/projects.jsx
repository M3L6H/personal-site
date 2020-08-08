import React, { forwardRef } from 'react';

import { Card, Container, Header, Icon } from 'semantic-ui-react';

import truncate from '../../util/truncate';

export default forwardRef(({ projects }, ref) => {
  return (
    <section className="projects" ref={ ref }>
      <Container>
        <Header size="huge" textAlign="center" inverted>
          Projects
        </Header>

        <Card.Group className="projects-container">
          { projects.map(({ title, summary, github, live, photo, id }) => (
            <Card
              key={ id }
              className="project"
              image={ photo }
              header={ title }
              description={ truncate(summary) }
              extra={ <>
                <a href={ github } target="_blank">
                  <Icon name="github" />
                  Github
                </a>

                { live &&
                  <a href={ live } target="_blank">
                    <Icon name="external" />
                    Live
                  </a>
                }
              </> }
            />
          )) }
        </Card.Group>
      </Container>
    </section>
  );
});
