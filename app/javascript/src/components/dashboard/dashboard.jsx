import React, { useEffect } from 'react';
import { withAuth, withMenu } from '../hocs';

import { Container } from 'semantic-ui-react';

import Navbar from './navbar';
import { BioForm, ProfilePhotoForm, ProjectForm, SkillForm } from '../forms';

const Dashboard = ({ fetchSubject }) => {
  useEffect(() => {
    fetchSubject();
  }, []);

  return (
    <Container text>
      <ProfilePhotoForm />
      <BioForm />
      <SkillForm />
      <ProjectForm />
    </Container>
  );
};

export default withAuth(withMenu(Dashboard, Navbar), { requireAdmin: true });