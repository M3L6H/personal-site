import React from 'react';
import { withAuth, withMenu } from '../hocs';

import { Container } from 'semantic-ui-react';

import Navbar from './navbar';
import { BioForm, ProfilePhotoForm } from '../forms';

const Dashboard = () => {
  return (
    <Container text>
      <ProfilePhotoForm />
      <BioForm />
    </Container>
  );
};

export default withAuth(withMenu(Dashboard, Navbar));