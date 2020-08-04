import React from 'react';
import { withAuth, withMenu } from '../hocs';

import Navbar from './navbar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      Dashboard
    </div>
  );
};

export default withAuth(withMenu(Dashboard, Navbar));