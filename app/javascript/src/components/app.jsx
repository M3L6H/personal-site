import React, { useRef } from "react";
import { Switch, Route } from "react-router-dom";

import About from "./about";
import Blog from "./blog";
import Dashboard from "./dashboard";
import EditButton from "./edit_button";
import Flash from "./flash";
import Footer from "./footer";
import Landing from "./landing";
import Navbar from "./navbar";
import PostEditor from "./post_editor";
import Projects from "./projects";
import Contact from "./contact";

const App = () => {
  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  return (
    <>
      <Switch>
        <Route path="/blog/:post">
          <Blog />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/dashboard/create-post">
          <PostEditor />
        </Route>
        <Route path="/dashboard">
          <Dashboard inverted />
        </Route>
        <Route path="/">
          <Landing ref={ landingRef } aboutRef={ aboutRef } />
          <Navbar pageRefs={ [landingRef, aboutRef, projectsRef, contactRef] } />
          <About ref={ aboutRef } />
          <Projects ref={ projectsRef } />
          <Contact ref={ contactRef } />
          <Footer />
          <EditButton route="dashboard" />
        </Route>
      </Switch>
      <Flash />
    </>
  );
};

export default App;
