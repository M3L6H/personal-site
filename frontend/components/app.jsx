import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import EditButton from './edit_button';
import Flash from './flash';
import Landing from './landing';
import About from './about';

export default () => {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard inverted />
        </Route>
        <Route path="/">
          <Landing />
          <About />
          <EditButton />
        </Route>
      </Switch>
      <Flash />
    </>
  );
};
