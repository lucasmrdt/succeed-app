// @flow

import React from 'react';
import { View } from 'react-native';
import Slider, { SliderState } from '@/components/Slider';
import {
  StylisedButton,
  Wrapper,
  Header,
  Body,
  IconButton,
  StylisedText,
} from '@/components/fragments';
import { createStyleSheet, getIcon } from '@/utils';
import { COLORS, SIZES } from '@/constants';
import { Cross } from '@/assets/icons';

import { type NavigationType } from '@/types/rnTypes';

const BOTTOM_COMPLETE_BUTTON = 30;
const COMPLETE_BUTTON_SIZE = {
  width: 120,
  height: 45,
};

export type ReduxProps = {
  onCompleteTask: (taskId: string, userScore: number) => void,
};

type Props = ReduxProps & {
  navigation: NavigationType,
};

class CompletetTaskScreen extends React.Component<Props> {

  shouldComponentUpdate = () => false;

  onClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  onComplete = () => {
    const { onCompleteTask, navigation } = this.props;
    const { value } = SliderState;
    const task = navigation.getParam('task', {});

    onCompleteTask(task.id, parseFloat(value));
    navigation.goBack();
  };

  renderHeader() {
    const { navigation } = this.props;
    const selectedTask = navigation.getParam('task', {});
    const Icon = getIcon(selectedTask.icon);

    return (
      <React.Fragment>
        <View style={styles.title}>
          <Icon color={selectedTask.color} size={SIZES.ICON_SIZE_L} />
          <StylisedText
            color={selectedTask.color}
            size='xl'
            style={styles.titleText}
          >
            {selectedTask.label.toUpperCase()}
          </StylisedText>
        </View>
        <IconButton
          color='transparent'
          onPress={this.onClose}
          icon={<Cross color={COLORS.PURPLE} size={SIZES.ICON_SIZE_M} />}
          dynamicSize
        />
      </React.Fragment>
    );
  }

  renderInstruction() {
    return (
      <View style={styles.instruction}>
        <StylisedText
          color={COLORS.DARK_GRAY}
          letterSpacing={2}
          size='l'
          style={styles.instructionText}
        >
          How much did you do ?
        </StylisedText>
      </View>
    );
  }

  renderButton() {
    return (
      <StylisedButton
        onPress={this.onComplete}
        style={styles.button}
        rightIcon='Tick'
        justify='space-between'
        iconSize={15}
        color={COLORS.PURPLE}
        rounded='fully'
        size={COMPLETE_BUTTON_SIZE}
        optimized
      >
        OKAY
      </StylisedButton>
    );
  }

  render() {
    const { navigation } = this.props;
    const task = navigation.getParam('task', null);

    if (!task) {
      navigation.goBack();
    }

    const { userScore, target, precision, color } = task;
    return (
      <Wrapper style={styles.wrapper}>
        <Header>
          {this.renderHeader()}
        </Header>
        <Body style={styles.body}>
          {this.renderInstruction()}
          <Slider
            precision={precision}
            value={userScore}
            toValue={target.max}
            fromValue={target.min}
            color={color}
          />
          {this.renderButton()}
        </Body>
      </Wrapper>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    paddingBottom: 0,
  },
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: BOTTOM_COMPLETE_BUTTON + COMPLETE_BUTTON_SIZE.height,
  },
  button: {
    position: 'absolute',
    bottom: BOTTOM_COMPLETE_BUTTON,
    paddingLeft: 15,
    paddingRight: 15,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    marginRight: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: 10,
  },
});

export default CompletetTaskScreen;
