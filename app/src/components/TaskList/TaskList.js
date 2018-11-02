// @flow

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import { createStyleSheet } from '@/utils';

import { type TaskType } from '@/types/dataTypes';
import { type StatusType } from '@/types/globalTypes';

export type Props = {
  tasks: Array<TaskType>,
  loadTasks: Function,
  refreshTasks: Function,
  status: StatusType,
};

class TaskList extends React.PureComponent<Props> {

  componentDidMount() {
    const { loadTasks } = this.props;
    loadTasks();
  }

  renderHeader() {
    // TODO: Make real header
    return <View style={styles.header} />;
  }

  renderItem = ({ item }: { item: TaskType }) => (
    <TaskItem task={item} />
  );

  renderFailScreen() {
    // TODO: Make fail screen
    return <Text>fail :(</Text>;
  }

  renderLoadingScreen() {
    // TODO: Make loading screen
    return <Text>loading...</Text>;
  }

  render() {
    const { tasks, status, refreshTasks } = this.props;

    if (status === 'loading') {
      return this.renderLoadingScreen();
    }

    if (status === 'fail') {
      return this.renderFailScreen();
    }

    return (
      <FlatList
        // We allow to keep more loaded data, because components are light.
        windowSize={41}

        data={tasks}
        keyExtractor={({ id }) => id}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        onRefresh={refreshTasks}
        refreshing={status === 'refreshing'}
        style={styles.wrapper}
      />
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  header: {
    height: 40,
    width: '100%',
  },
});

export default TaskList;
