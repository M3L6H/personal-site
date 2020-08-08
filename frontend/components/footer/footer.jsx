import React from 'react';

import { Icon } from 'semantic-ui-react';

export default () => {
  return (
    <div className="footer">
      <span className="footer-left">
        <span className="license">
          Licensed under <a href="https://github.com/M3L6H/personal-site/blob/master/LICENSE.md" target="_blank">the GNU GPL 3.0</a>
        </span>
        <span className="name">
          Michael Hollingworth
        </span>
      </span>
      <span className="footer-right">
        <Icon name="github square" link size="large" onClick={ () => window.open("https://github.com/M3L6H", "_blank") } />
        <Icon name="linkedin square" link size="large" onClick={ () => window.open("https://www.linkedin.com/in/michaelhollingworthl/", "_blank") } />
      </span>
    </div>
  );
};
