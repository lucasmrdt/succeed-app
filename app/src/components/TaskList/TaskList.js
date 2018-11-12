// @flow

import React from 'react';
import { SectionList, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import { StylisedText } from '@/components/fragments';
import { createStyleSheet } from '@/utils';
import { STATUS, COLORS } from '@/constants';

import { type TaskType } from '@/types/dataTypes';
import { type StatusType } from '@/types/globalTypes';

type SectionHeaderProps = {
  data: Array<TaskType>,
  color: string,
  title: string,
};

export type ReduxProps = {
  tasks: Array<TaskType>,
  loadTasks: Function,
  refreshTasks: Function,
  status: StatusType,
};

type Props =  ReduxProps & {
  onItemPress: (id: string) => void,
};

class TaskList extends React.PureComponent<Props> {

  componentDidMount() {
    const { loadTasks } = this.props;
    loadTasks();
  }

  getSections = () => {
    const { tasks } = this.props;

    const todoTasks: SectionHeaderProps = {
      data: [],
      title: 'todo',
      color: COLORS.DARK_GRAY,
    };
    const failedTasks: SectionHeaderProps = {
      data: [],
      title: 'failed',
      color: COLORS.RED_PASTEL,
    };
    const succeedTasks: SectionHeaderProps = {
      data: [],
      title: 'done',
      color: COLORS.GREEN_PASTEL,
    };

    tasks.forEach(task => {
      if (task.status === STATUS.TODO_STATUS) {
        todoTasks.data.push(task);
      } else if (task.status === STATUS.FAIL_STATUS) {
        failedTasks.data.push(task);
      } else {
        succeedTasks.data.push(task);
      }
    });

    return [todoTasks, failedTasks, succeedTasks];
  }

  renderHeader() {
    // TODO: Make real header
    return <View style={styles.header} />;
  }

  renderFooter() {
    return <View style={styles.footer} />;
  }

  renderItem = ({ item }: { item: TaskType }) => {
    const { onItemPress } = this.props;
    return <TaskItem task={item} onPress={onItemPress} />;
  }

  renderSectionHeader = ({ section }: { section: SectionHeaderProps }) => {
    const { color, title, data } = section;

    if (data.length === 0) {
      return null;
    }
    return (
      <View style={styles.sectionHeader}>
        {title === 'todo'
          ? <React.Fragment>
            <StylisedText color={COLORS.GRAY} size='xxl' type='bold'>t</StylisedText>
            <StylisedText color={COLORS.RED_PASTEL} size='xxl' type='bold'>o</StylisedText>
            <StylisedText color={COLORS.YELLOW_PASTEL} size='xxl' type='bold'>d</StylisedText>
            <StylisedText color={COLORS.GREEN_PASTEL} size='xxl' type='bold'>o</StylisedText>
          </React.Fragment>
          : <StylisedText color={color} size='xxl' type='bold'>{title}</StylisedText>
        }
      </View>
    );
  }

  renderFailScreen() {
    // TODO: Make fail screen
    return <Text>fail :(</Text>;
  }

  renderLoadingScreen() {
    // TODO: Make loading screen
    return <Text>loading...</Text>;
  }

  render() {
    const { status, refreshTasks } = this.props;

    if (status === 'loading') {
      return this.renderLoadingScreen();
    }

    if (status === 'fail') {
      return this.renderFailScreen();
    }

    return (
      <SectionList
        // We allow to keep more loaded data, because components are light.
        windowSize={41}

        stickySectionHeadersEnabled={false}
        sections={this.getSections()}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={({ id }) => id}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
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
    height: 10,
    width: '100%',
  },
  footer: {
    height: 70,
    width: '100%',
  },
  sectionHeader: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 60,
  },
});

export default TaskList;
