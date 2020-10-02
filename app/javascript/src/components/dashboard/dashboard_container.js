import { connect } from 'react-redux';

import { fetchSubject } from '../../actions/subject_actions';

import Dashboard from './dashboard';

const mapDispatchToProps = (dispatch) => ({
  fetchSubject: () => dispatch(fetchSubject())
});

export default connect(null, mapDispatchToProps)(Dashboard);
