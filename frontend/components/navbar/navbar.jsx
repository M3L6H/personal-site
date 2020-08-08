import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { withWindowDimensions } from '../hocs';

import { Menu } from 'semantic-ui-react';

const Navbar = ({ pageRefs }) => {
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  const menuItems = ["home", "about", "projects"];

  useEffect(() => {
    const bodyRect = document.body.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const eltHeight = navRect.top - bodyRect.top;
    
    const scrollHandler = _.throttle(e => {
      if (eltHeight <= window.scrollY) {
        navRef.current.classList.add("stick");
      } else {
        navRef.current.classList.remove("stick");
      }

      for (let i = pageRefs.length - 1; i >= 0; --i) {
        if (pageRefs[i].current) {
          const refRect = pageRefs[i].current.getBoundingClientRect();

          if (window.scrollY >= refRect.top - bodyRect.top) {
            setActive(menuItems[i]);
            break;
          }
        }
      }
    }, 10);

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  });
  
  return (
    <div className="navbar-placeholder">
      <div className="navbar-container" ref={ navRef }>
        <Menu inverted className="navbar">
          {
            menuItems.map((item, idx) => (
              <Menu.Item
                key={ item }
                name={ item }
                active={ active === item }
                onClick={ () => {
                  const ref = pageRefs[idx];
                  const bodyRect = document.body.getBoundingClientRect();
                  const refRect = ref.current.getBoundingClientRect();
                  $({ myScrollTop: window.scrollY }).animate({
                    myScrollTop: refRect.top - bodyRect.top
                  }, { 
                    duration: 800,
                    step: val => window.scrollTo(0, val)
                  }, () => setActive(item));
                } }
              />
            ))
          }
        </Menu>
      </div>
    </div>
  );
};

export default withWindowDimensions(Navbar);
