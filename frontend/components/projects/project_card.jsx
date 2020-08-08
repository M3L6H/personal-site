import React, { useState } from 'react';

import { Card, Icon } from 'semantic-ui-react'

import truncate from '../../util/truncate';

const dtf = new Intl.DateTimeFormat("en", { 
  year: "numeric", 
  month: "short",
  day: "2-digit"
});

export default ({ title, summary, github, live, photo, id, date }) => {
  const [flipped, setFlipped] = useState(false);
  let meta = "Loading...";

  if (date) {
    const [{ value: month },,{ value: day },,{ value: year }] = 
      dtf.formatToParts(date);
    meta = `Last Updated: ${ month } ${ day }, ${ year }`;
  }
  
  return (
    <Card
      className="project"
      image={ photo }
      header={ title }
      meta={ meta }
      description={ <>
        { truncate(summary) } <a>Click for more</a>
      </> }
      extra={ <>
        <a href={ github } target="_blank">
          <Icon name="github" />
          Github
        </a>

        { live &&
          <a href={ live } target="_blank">
            <Icon name="external" />
            Live
          </a>
        }
      </> }
    />
  );
};
