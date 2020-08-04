import React from 'react';
import { withAuth, withMenu } from '../hocs';

import Navbar from './navbar';
import { ProjectForm } from '../forms';

const Dashboard = () => {
  return (
    <ProjectForm />
  );
};

export default withAuth(withMenu(Dashboard, Navbar));