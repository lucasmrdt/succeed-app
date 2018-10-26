// @flow

import { connect } from 'react-redux';
import Level from '@/components/Level';
import { updateLevel } from '@/actions/userActions';

import { type StateType } from '@/types/reduxTypes';
import { type LevelType } from '@/types/dataTypes';

const mapStateToProps = (state: StateType) => ({
  score: state.user.level.score,
  progress: state.user.level.progress,
  limit: state.user.level.limit,
});

const mapDispatchToProps = {
  updateLevel: (level: LevelType) => (
    updateLevel(level)
  ),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Level);
