import React from "react";

import { CATEGORIES, COLORS } from "../../util/constants";
import capitalize from "../../util/capitalize";

import { Dropdown } from "semantic-ui-react";

export default ({ active, setActive }) => {
  return (
    <Dropdown
      icon="filter"
      labeled
      className="icon skills-filter"
    >
      <Dropdown.Menu scrolling>
        <Dropdown.Item
          onClick={ () => setActive(0) }
          label={{ color: "orange", empty: true, circular: true }}
          text="All Skills"
          className={`${ active === 0 ? "active" : "" }`}
        />
        <Dropdown.Divider />
        { CATEGORIES.map((category, idx) => (
          <Dropdown.Item
            key={ category }
            label={{ color: COLORS[idx], empty: true, circular: true }}
            onClick={ () => setActive(active ^ (1 << idx)) }
            text={ capitalize(category) }
            className={`${ (active >> idx) & 1 === 1 ? "active" : "" }`}
          />
        )) }
      </Dropdown.Menu>
    </Dropdown>
  );
};
