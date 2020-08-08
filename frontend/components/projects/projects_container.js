import { connect } from 'react-redux';

import Projects from './projects';

const mapStateToProps = (state) => ({
  projects: Object.values(state.entities.projects)
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(Projects);
