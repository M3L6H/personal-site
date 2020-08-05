import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Dropdown, Menu } from 'semantic-ui-react';

import { withWindowDimensions } from '../hocs';

const Navbar = (props) => {
  const { user, computer } = props;

  return (
    <Menu
      attached={ props.attached }
      inverted
    >
      <Menu.Item
        header
        className="primary"
      >
        <Link to="/">{ user.username }</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        { computer ? (
          <Menu.Item
          >
            Sign Out
          </Menu.Item>
        ) : (
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item>
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) }
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUserId]
});

export default connect(mapStateToProps, null)(withWindowDimensions(Navbar));
