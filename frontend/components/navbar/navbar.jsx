import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';

import { Menu } from 'semantic-ui-react';

export default (props) => {
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  const menuItems = ["home", "about"];

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
    }, 10);

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  
  return (
    <div className="navbar-placeholder">
      <div className="navbar-container" ref={ navRef }>
        <Menu inverted className="navbar">
          {
            menuItems.map(item => (
              <Menu.Item
                key={ item }
                name={ item }
                active={ active === item }
                onClick={ () => setActive(item) }
              />
            ))
          }
        </Menu>
      </div>
    </div>
  );
};
