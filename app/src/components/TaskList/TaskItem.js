// @flow

import React from 'react';
import { View } from 'react-native';
import { StylisedButton, StylisedText } from '@/components/fragments';
import { SIZES, COLORS, STATUS } from '@/constants';
import { Tick } from '@/assets/icons';
import { getIcon, createStyleSheet } from '@/utils';

import { type TaskType } from '@/types/dataTypes';

const INDICATOR_SEPARATOR_MARGIN = 8;
const ITEM_WIDTH = SIZES.WIDTH * .9;
const ITEM_SPACE = 15;
const ITEM_HEIGHT = 60;
const ITEM_SIZE = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
};
const SUCCESS_ITEM_SIZE = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT * .7,
};

type Props = {
  task: TaskType,
  onPress: (id: string) => void,
};

class TaskItem extends React.Component<Props> {

  shouldComponentUpdate(prevProps: Props) {
    const { task } = this.props;
    return (prevProps.task.userScore !== task.userScore);
  }

  getColor() {
    const { task: { status } } = this.props;

    let primaryColor = COLORS.LIGHT_GRAY;
    let secondaryColor = COLORS.DARK_GRAY;

    if (status === STATUS.SUCCESS_STATUS) {
      primaryColor = 'transparent';
      secondaryColor = COLORS.GREEN_PASTEL;
    } else if (status === STATUS.FAIL_STATUS) {
      primaryColor = COLORS.RED_PASTEL;
      secondaryColor = COLORS.WHITE;
    }

    return {
      primary: primaryColor,
      secondary: secondaryColor,
    };
  }

  renderTaskIndicator = (color) => {
    const { task } = this.props;

    return (
      <View style={styles.indicatorWrapper}>
        <StylisedText type='bold' size='l' color={color}>
          {task.userScore || 0}
        </StylisedText>
        <StylisedText color={color} style={styles.indicatorSperator}>
          {'/'}
        </StylisedText>
        <StylisedText color={color}>
          {task.target.todo}
        </StylisedText>
      </View>
    );
  }

  renderRightIcon = (color) => {
    const { task } = this.props;

    if (task.status === STATUS.SUCCESS_STATUS) {
      return <Tick color={color} size={13}/>;
    }
    return this.renderTaskIndicator(color);
  }

  renderLeftIcon = (color) => {
    const { task } = this.props;
    const Icon = getIcon(task.icon);
    const size = (task.status === STATUS.TODO_STATUS ? 30 : 20);
    const computedColor = (task.status === STATUS.TODO_STATUS
      ? task.color
      : color
    );

    return <Icon size={size} color={computedColor}/>;
  }

  render() {
    const { task, onPress } = this.props;
    const { primary, secondary } = this.getColor();

    return (
      <StylisedButton
        // Used to update right Icon when userScore is updated.
        value={task.userScore}
        rightIcon={this.renderRightIcon}

        leftIcon={this.renderLeftIcon}
        size={task.status === STATUS.SUCCESS_STATUS
          ? SUCCESS_ITEM_SIZE
          : ITEM_SIZE
        }
        justify='space-between'
        secondaryColor={secondary}
        primaryColor={primary}
        style={styles.item}
        onPress={onPress}
        id={task.id}
        optimized
      >
        {task.label}
      </StylisedButton>
    );
  }
}

const styles = createStyleSheet({
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicatorSperator: {
    marginLeft: INDICATOR_SEPARATOR_MARGIN,
    marginRight: INDICATOR_SEPARATOR_MARGIN,
  },
  item: {
    marginTop: ITEM_SPACE,
    marginBottom: ITEM_SPACE,
    marginLeft: (SIZES.WIDTH - ITEM_SIZE.width) / 2, // center item
    paddingRight: ITEM_SPACE,
    paddingLeft: ITEM_SPACE,
    shadowOpacity: 0, // remove shadow on ios device
  },
});

export default TaskItem;
