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

type Props = {
  task: TaskType
};

class TaskItem extends React.PureComponent<Props> {

  getColor() {
    const { task: { statut } } = this.props;

    let primaryColor = COLORS.LIGHT_GRAY;
    let secondaryColor = COLORS.DARK_GRAY;

    if (statut === STATUS.SUCCESS_STATUS) {
      primaryColor = COLORS.GREEN_PASTAL;
      secondaryColor = COLORS.GREEN_PASTAL;
    } else if (statut === STATUS.FAIL_STATUS) {
      primaryColor = COLORS.RED_PASTAL;
      secondaryColor = COLORS.RED_PASTAL;
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
          {task.userScore}
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

    if (task.statut === STATUS.SUCCESS_STATUS) {
      return <Tick color={COLORS.GREEN_PASTAL} size={13}/>;
    }
    return this.renderTaskIndicator(color);
  }

  renderLeftIcon = () => {
    const { task } = this.props;
    const Icon = getIcon(task.icon);
    const size = (task.statut === STATUS.TODO_STATUS ? 30 : 20);
    const color = (task.statut === STATUS.TODO_STATUS
      ? task.color
      : this.getColor().secondary
    );

    return <Icon size={size} color={color}/>;
  }

  render() {
    const { task } = this.props;
    const { primary, secondary } = this.getColor();

    return (
      <StylisedButton
        leftIcon={this.renderLeftIcon}
        rightIcon={this.renderRightIcon}
        size={ITEM_SIZE}
        justify='space-between'
        secondaryColor={secondary}
        primaryColor={primary}
        light={task.statut !== STATUS.TODO_STATUS}
        style={styles.item}
        onPress={() => console.log('press')}
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
