import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Landing from './landing';

export default () => {
  return (
    <Switch>
      <Route path="/dashboard" component={ Dashboard } />
      <Route path="/" component={ Landing } />
    </Switch>
  );
};
