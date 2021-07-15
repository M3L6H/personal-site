import React, { forwardRef } from "react";

import {
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Popup,
  Segment
} from "semantic-ui-react";

import Skills from "../skills";

const About = forwardRef(({ user }, ref) => {
  return (
    <section className="about" ref={ ref }>
      <Container text>
        <Header size="huge" textAlign="center">
          About
        </Header>

        <Grid stackable columns={ 2 } className="about-grid">
          <Grid.Column className="about-photo-column">
            <Segment
              className="profile-photo-segment"
              placeholder
              circular
            >
              <div className="profile-photo-container">
                <Image
                  className="profile-photo"
                  src={ user.photo }
                />
              </div> 
            </Segment>
          </Grid.Column>
          <Grid.Column className="bio-column">
            <Segment padded basic>
              { user.bio }
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      <Skills />
      <div className="resume-section">
        <Popup
          content="Click to open in new tab"
          trigger={
            <Label
              as="a"
              className="resume-link"
              size="huge"
              href="/documents/michael-hollingworth-resume.pdf"
              target="_blank"
            >
              <Icon name="file alternate outline" />Resume
            </Label>
          }
        />
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
