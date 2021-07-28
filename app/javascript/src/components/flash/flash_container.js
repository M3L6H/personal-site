import { connect } from "react-redux";

import { clearFlash } from "../../actions/flash_actions";

import Flash from "./flash";

const mapStateToProps = ({ flash }) => ({
  flash
});

const mapDispatchToProps = (dispatch) => ({
  clearFlash: () => dispatch(clearFlash())
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
