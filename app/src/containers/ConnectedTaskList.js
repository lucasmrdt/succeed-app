// @flow

import { connect } from 'react-redux';
import TaskList, { type TaskListProps } from '@/components/TaskList';
import { refreshTasks, loadTasks } from '@/actions/taskActions';

import { type StateType } from '@/types/reduxTypes';

const mapStateToProps = (state: StateType): TaskListProps => ({
  tasks: state.task.tasks,
  status: state.task.status,
});
const mapDispatchToProps: TaskListProps = {
  refreshTasks,
  loadTasks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskList);
