import React, { forwardRef } from 'react';

import { Card, Container, Header, Icon } from 'semantic-ui-react';

import truncate from '../../util/truncate';

export default forwardRef(({ projects, commits }, ref) => {
  const dtf = new Intl.DateTimeFormat("en", { 
    year: "numeric", 
    month: "short",
    day: "2-digit"
  });

  const mappedProjects = projects.map(project => ({
    ...project,
    updated: commits[project.github] ? commits[project.github].commit.author.date : null
  }));
  
  return (
    <section className="projects" ref={ ref }>
      <Container>
        <Header size="huge" textAlign="center" inverted>
          Projects
        </Header>

        <Card.Group className="projects-container">
          { mappedProjects.map(({ title, summary, github, live, photo, id, updated }) => {
            let meta = "Loading...";

            if (updated) {
              const date = new Date(updated);
              const [{ value: month },,{ value: day },,{ value: year }] = 
                dtf.formatToParts(date);
              meta = `Last Updated: ${ month } ${ day }, ${ year }`;
            }
            
            return (<Card
                key={ id }
                className="project"
                image={ photo }
                header={ title }
                meta={ meta }
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
            );
          }) }
        </Card.Group>
      </Container>
    </section>
  );
});
