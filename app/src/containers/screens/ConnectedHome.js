// @flow

import { connect } from 'react-redux';
import { Home } from '@/components/screens';
import { selectTask } from '@/actions/taskActions';

import { type StateType } from '@/types/reduxTypes';
import { type ReduxProps } from '@/components/screens/Home';

const mapStateToProps = (state: StateType): ReduxProps => ({
  tasks: state.task.tasks,
});

const mapDispatchToProps: ReduxProps = {
  onSelectTask: (taksId: string) => selectTask(taksId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
