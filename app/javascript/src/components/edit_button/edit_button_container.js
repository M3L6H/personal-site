import { connect } from "react-redux";

import EditButton from "./edit_button";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: state.entities.users[state.session.currentUserId]
});

export default connect(mapStateToProps, null)(EditButton);
