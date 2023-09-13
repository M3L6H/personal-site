<h1 align="center">Personal Site</h1>

- [About](#about)
- [Technologies](#technologies)
- [Features](#features)
  - [SVG Animation](#svg-animation)
  - [Animated Skill Filters](#animated-skill-filters)
  - [Responsive](#responsive)

## About

My personal site is built on a Rails-React-Redux stack using webpacker. It is
hosted on Heroku and uses S3 for storage. It is a single-page
scrolling site containing advanced features like a sticky navbar, responsive
layout for desktop and mobile, animated filters, and more.

Additionally, it has a custom-built administrator interface that allows the site
owner (me) to change the content on the site at will, without modifying the
source code.

## Technologies

The site is built with a React/Redux frontend. It uses Semantic UI for a lot of
the styling. When custom styles were needed, they were written with SASS.
Anime.js was used for many of the animations. The frontend of the site was built
using Webpacker.

In an effort to learn React hooks, all except one component was written
functionally.

On the backend, Rails was used with a typical RESTful API. Axios was used to
make the queries between frontend and backend. The underlying database is
PostgreSQL and BCrypt was used for authentication.

## Features

### SVG Animation

<p align="center">
  <img alt="Image of SVG animation" src="/images/Name.gif">
</p>

A significant challenge in the course of development was to get the SVG
animation for the name to work. Although React Anime, a React wrapper around
anime.js was used for most of the animations, the documentation for SVG
animation with React Anime was lacking, so I resorted to using vanilla anime.js.

### Animated Skill Filters

<p align="center">
  <img alt="Image of skills animation" src="/images/Skills.gif">
</p>

While filtering the skills by type did not prove to be a particularly challenging
task, figuring out how to animate them smoothly proved to be quite difficult.
The final result involved using some carefully crafted SCSS to shrink the skills
to a width and height of 0, while also using flexbox to keep the skills aligned
nicely.

```scss
.skills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .skill {
    flex: 1 1 auto;
    margin: 0.25rem;
    overflow: hidden;
    transition: all 0.5s;
    cursor: default;

    &.hide {
      flex-grow: 0;
      height: 0;
      width: 0;
      padding: 0;
      margin: 0;
      opacity: 0;
    }
  }
}
```

### Responsive

<p align="center">
  <img alt="Image of responsive site" src="/images/Responsive.gif">
</p>

An important feature to the site was for it to be viewable on both desktop and
mobile devices. Although Semantic UI was helpful in a lot of the responsive
adjustments, some custom changes had to be made. A notable one is that on mobile
views, the filters for skills becomes a dropdown instead of a line of buttons.

For this, a custom Context Provider had to be made. While a higher-order
component might have worked, it was desirable to include an event listener for
window resizing, which would have been redundant when used in a hoc (including
the hoc in multiple components would result in multiple copies of the event
listener).

Thus a Context Provider was built with an accompanying hoc to inject the
relevant parts of state.

```jsx
// Context Provider
import React, { useState, useEffect } from 'react';

import {
  MOBILE,
  TABLET,
  COMPUTER,
  LARGE_SCREEN,
  WIDE_SCREEN
  } from '../../util/constants';
import debounce from '../../util/debouncer';

const w = window.innerWidth;

export const WindowContext = React.createContext({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  mobile: w <= MOBILE,
  tablet: w > MOBILE && w <= TABLET,
  computer: w > TABLET,
  largeScreen: w > COMPUTER,
  wideScreen: w > LARGE_SCREEN,
  ultraWideScreen: w > WIDE_SCREEN
});

export default props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const w = window.innerWidth;

  // mobile, tablet, and computer are mutually exclusive
  const [mobile, setMobile] = useState(w <= MOBILE);
  const [tablet, setTablet] = useState(w > MOBILE && w <= TABLET);
  const [computer, setComputer] = useState(w > TABLET);

  // Anything that is large, wide, or ultra wide will also be considered a
  // computer
  const [largeScreen, setLargeScreen] = useState(w > COMPUTER);
  const [wideScreen, setWideScreen] = useState(w > LARGE_SCREEN);
  const [ultraWideScreen, setUltraWideScreen] = useState(w > WIDE_SCREEN);

  // Set up callback
  const updateWindowDimensions = debounce(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const w = window.innerWidth;
    setMobile(w <= MOBILE);
    setTablet(w > MOBILE && w <= TABLET);
    setComputer(w > TABLET);
    setLargeScreen(w > COMPUTER);
    setWideScreen(w > LARGE_SCREEN);
    setUltraWideScreen(w > WIDE_SCREEN);

    // Update viewport height and width
    // Necessary for styles relying on these variables
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;

    document.documentElement.style.setProperty("--vh", `${ vh }px`);
    document.documentElement.style.setProperty("--vw", `${ vw }px`);
  });

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const value = {
    windowWidth,
    windowHeight,
    mobile,
    tablet,
    computer,
    largeScreen,
    wideScreen,
    ultraWideScreen
  };

  return <WindowContext.Provider { ...props } value={ value } />;
};
```
