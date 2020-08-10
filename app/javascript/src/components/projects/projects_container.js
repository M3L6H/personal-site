import { connect } from 'react-redux';

import Projects from './projects';

const mapStateToProps = (state) => ({
  projects: Object.values(state.entities.projects),
  commits: state.entities.commits
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(Projects);
