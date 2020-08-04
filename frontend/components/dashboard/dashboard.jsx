import React from 'react';
import { withAuth } from '../hocs';

const dashboard = () => {
  return (
    <div className="dashboard">
      Dashboard
    </div>
  );
};

export default withAuth(dashboard);