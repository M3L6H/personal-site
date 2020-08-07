import React from 'react';
import { withAuth, withMenu } from '../hocs';

import { Container } from 'semantic-ui-react';

import Navbar from './navbar';
import { BioForm, ProfilePhotoForm, SkillForm } from '../forms';

const Dashboard = () => {
  return (
    <Container text>
      <ProfilePhotoForm />
      <BioForm />
      <SkillForm />
    </Container>
  );
};

export default withAuth(withMenu(Dashboard, Navbar), { requireAdmin: true });