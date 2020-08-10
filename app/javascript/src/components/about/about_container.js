import { connect } from 'react-redux';

import About from './about';

const mapStateToProps = (state) => ({
  user: state.entities.subject
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(About);
