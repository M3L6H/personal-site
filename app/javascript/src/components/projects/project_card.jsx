import React, { useState } from "react";

import { Card, Header, Icon } from "semantic-ui-react";

import truncate from "../../util/truncate";

const dtf = new Intl.DateTimeFormat("en", { 
  year: "numeric", 
  month: "short",
  day: "2-digit"
});

const ProjectCard = ({ title, summary, description, github, live, photo, date }) => {
  const [flipped, setFlipped] = useState(false);
  let meta = "Loading...";

  if (date) {
    const [{ value: month },,{ value: day },,{ value: year }] = 
      dtf.formatToParts(date);
    meta = `Last Updated: ${ month } ${ day }, ${ year }`;
  }

  const extra = (<>
    <a href={ github } onClick={ e => e.stopPropagation() } target="_blank" rel="noreferrer">
      <Icon name="github" />
      Github
    </a>

    { live &&
      <a href={ live } onClick={ e => e.stopPropagation() } target="_blank" rel="noreferrer">
        <Icon name="external" />
        Live
      </a>
    }
  </>);
  
  return (
    <div className="flip-card">
      <div
        className={ `flip-card-inner${ flipped ? " flipped" : "" }` }
        onClick={ () => setFlipped(!flipped) }
      >
        <Card
          className="project flip-card-front"
          image={ photo }
          header={ title }
          meta={ meta }
          description={ <>
            { truncate(summary, 100) } <a style={{ display: "block" }}>Click for more</a>
          </> }
          extra={ extra }
        />
        <Card
          className="project flip-card-back"
          header={ <div className="flip-card-back-header">
            <Header size="large">{ title }</Header>
            <Icon name="reply" link size="large" className="flip-back" />
          </div> }
          meta={ meta }
          description={ description }
          extra={ extra }
        />
      </div>
    </div>
  );
};

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
