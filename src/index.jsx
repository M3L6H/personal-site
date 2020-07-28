import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

document.addEventListener("DOMContentLoaded", () => {
  // Set up viewport height and width for mobile
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);

  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
});