import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Dropdown, Menu } from "semantic-ui-react";

import { withWindowDimensions } from "../hocs";

import { deleteSession } from "../../actions/session_actions";

const Navbar = (props) => {
  const { user, computer, attached, signout } = props;

  const items = [
    {
      link: "/dashboard",
      text: "Dashboard"
    },
    {
      link: "/dashboard/create-post",
      text: "Create Post"
    },
    {
      onClick: signout,
      text: "Sign Out"
    }
  ];

  return (
    <Menu
      attached={ attached }
      inverted
      className="dashboard-navbar"
    >
      <Menu.Item
        header
        className="primary"
      >
        <Link to="/">{ user.username }</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        { computer ? (<>{
          items.map(({ link, text, onClick }) => (
            <Menu.Item onClick={ onClick } key={ text }>
              { link ? (
                <Link to={ link }>{ text }</Link>
              ) : (
                text
              )}
            </Menu.Item>
          ))
        }</>) : (
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              {
                items.map(({ link, text, onClick }) => (
                  <Dropdown.Item onClick={ onClick } key={ text }>
                    { link ? (
                      <Link className="dropdown-link" to={ link }>{ text }</Link>
                    ) : (
                      text
                    )}
                  </Dropdown.Item>
                ))
              }
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
