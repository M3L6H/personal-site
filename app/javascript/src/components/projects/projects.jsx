import React, { forwardRef } from 'react';

import { Card, Container, Header } from 'semantic-ui-react';

import ProjectCard from './project_card';

export default forwardRef(({ projects, commits }, ref) => {
  const mappedProjects = projects.map(project => ({
    ...project,
    date: commits[project.github] ? new Date(commits[project.github].commit.author.date) : null
  }));

  mappedProjects.sort(({ date: a }, { date: b }) => {
    if (!a || !b) return 0;
    return b - a;
  });
  
  return (
    <section className="projects" ref={ ref }>
      <Container>
        <Header size="huge" textAlign="center" inverted>
          Projects
        </Header>

        <Card.Group className="projects-container">
          { mappedProjects.map((project) => (
            <ProjectCard { ...project } key={ project.id } />
          )) }
        </Card.Group>
      </Container>
    </section>
  );
});
