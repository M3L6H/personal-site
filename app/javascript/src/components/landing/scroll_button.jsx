import React from "react";
import Anime from "react-anime";

import { Icon } from "semantic-ui-react";

import anime from "animejs";

const animProps = {
  keyframes: [
    { translateY: 20 },
    { translateY: 0 },
    { translateY: 20 },
    { translateY: 0 }
  ],
  delay: 4000,
  duration: 800,
  easing: "easeInCubic",
  loop: true
};

export default ({ aboutRef }) => {
  return (
    <div className="scroll-button">
      <Anime { ...animProps } >
        <Icon 
          size="huge" 
          name="arrow alternate circle down outline"
          onClick={ () => {
            const bodyRect = document.body.getBoundingClientRect();
            const refRect = aboutRef.current.getBoundingClientRect();
            anime({
              targets: { scrollY: window.scrollY },
              scrollY: refRect.top - bodyRect.top,
              duration: 800,
              easing: "easeInOutQuad",
              update: anim => {
                window.scrollTo(0, anim.animations[0].currentValue);
              }
            });
          } }
        />
      </Anime>
    </div>
  );
};
