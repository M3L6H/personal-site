import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchSubject } from '../actions/subject_actions';

import About from './about';
import Dashboard from './dashboard';
import EditButton from './edit_button';
import Flash from './flash';
import Landing from './landing';
import Navbar from './navbar';

const App = ({ fetchSubject }) => {
  useEffect(() => {
    fetchSubject()
  }, []);
  
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard inverted />
        </Route>
        <Route path="/">
          <Landing />
          <Navbar />
          <About />
          <EditButton />
        </Route>
      </Switch>
      <Flash />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubject: () => dispatch(fetchSubject())
});

export default connect(null, mapDispatchToProps)(App);
