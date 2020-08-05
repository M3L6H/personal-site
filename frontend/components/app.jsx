import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import EditButton from './edit_button';
import Landing from './landing';

export default () => {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard inverted />
        </Route>
        <Route path="/" component={ Landing } />
      </Switch>
      <EditButton />
    </>
  );
};
