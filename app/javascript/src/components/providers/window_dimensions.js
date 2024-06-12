import React, { useState, useEffect } from "react";

import { 
  MOBILE, 
  TABLET, 
  COMPUTER, 
  LARGE_SCREEN, 
  WIDE_SCREEN 
} from "../../util/constants";
import debounce from "../../util/debouncer";

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
