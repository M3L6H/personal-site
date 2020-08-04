import React, { useEffect, useState } from "react";

import debounce from '../../util/debouncer.js';
import { 
  MOBILE, 
  TABLET, 
  COMPUTER, 
  LARGE_SCREEN, 
  WIDE_SCREEN 
} from '../../util/constants';

export default (Component) => {
  return (props) => {
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
    console.log(window.innerWidth);
    console.log(mobile);

    // Set up callback
    const updateWindowDimensions = debounce(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      console.log(window.innerWidth);

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

    const childProps = {
      ...props,
      windowWidth,
      windowHeight,
      mobile,
      tablet,
      computer,
      largeScreen,
      wideScreen,
      ultraWideScreen
    };

    return (
      <Component { ...childProps } />
    );
  };
};