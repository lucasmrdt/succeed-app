// @flow

import { connect } from 'react-redux';
import Level from '@/components/Level';

import { type StateType } from '@/types/reduxTypes';
import { type LevelType } from '@/types/dataTypes';

const mapStateToProps = (state: StateType): LevelType => ({
  score: state.user.level.score,
  progress: state.user.level.progress,
  limit: state.user.level.limit,
});

export default connect(
  mapStateToProps
)(Level);
