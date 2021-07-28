import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Dropdown, Menu } from "semantic-ui-react";

import { withWindowDimensions } from "../hocs";

import { deleteSession } from "../../actions/session_actions";

const Navbar = (props) => {
  const { user, computer, attached, signout } = props;

  return (
    <Menu
      attached={ attached }
      inverted
    >
      <Menu.Item
        header
        className="primary"
      >
        <Link to="/">{ user.username }</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        { computer ? (<>
          <Menu.Item
          >
            <Link to="/dashboard/create-post">Create Post</Link>
          </Menu.Item>
          <Menu.Item
            onClick={ signout }
          >
            Sign Out
          </Menu.Item>
        </>) : (
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item>
              <Link to="/dashboard/create-post">Create Post</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={ signout }>
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

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(deleteSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(withWindowDimensions(Navbar));
