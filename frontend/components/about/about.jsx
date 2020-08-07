import React, { forwardRef } from 'react';

import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react';

export default forwardRef(({ user }, ref) => {
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
    </section>
  );
});
