import React, { useEffect, useRef } from 'react';
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
  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  
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
          <Landing ref={ landingRef } />
          <Navbar pageRefs={ [landingRef, aboutRef] } />
          <About ref={ aboutRef } />
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
