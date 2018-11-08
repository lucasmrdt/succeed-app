// @flow

import { connect } from 'react-redux';
import { CompleteTask } from '@/components/screens';
import { completeTask } from '@/actions/taskActions';

import { type ReduxProps } from '@/components/screens/CompleteTask';

const mapDispatchToProps: ReduxProps = {
  onCompleteTask: (taskId: string, userScore: number) => (
    completeTask(taskId, userScore)
  ),
};

export default connect(
  null,
  mapDispatchToProps,
)(CompleteTask);
