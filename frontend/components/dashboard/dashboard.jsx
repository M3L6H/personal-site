import React from 'react';
import withAuth from '../hocs/with_auth';

const dashboard = () => {
  return (
    <div className="dashboard">
      Dashboard
    </div>
  );
};

export default withAuth(dashboard);