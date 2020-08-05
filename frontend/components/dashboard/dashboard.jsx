import React from 'react';
import { withAuth, withMenu } from '../hocs';

import Navbar from './navbar';
import { BioForm } from '../forms';

const Dashboard = () => {
  return (
    <BioForm />
  );
};

export default withAuth(withMenu(Dashboard, Navbar));