import { connect } from 'react-redux';

import Skills from './skills';

const mapStateToProps = state => ({
  skills: Object.values(state.entities.skills)
});

export default connect(mapStateToProps, null)(Skills);
