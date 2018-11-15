// @flow

import React from 'react';
import { View, Animated } from 'react-native';
import { Line, Header, IconButton } from '@/components/fragments';
import { Rocket, Dot, Cross } from '@/assets/icons';
import { COLORS, SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

const PRIMARY_COLOR = COLORS.PURPLE;
const PROGRESS_WIDTH = 250;
const ITEM_WIDTH = SIZES.WIDTH;
const ROCKET_SIZE = SIZES.ICON_SIZE_L;
const DOT_SIZE = SIZES.ICON_SIZE_XXS;

type Props = {
  nbSteps: number,
  progress: Animated.Value,
  onClose: Function,
};

class StepperForm extends React.PureComponent<Props> {

  renderProgressBar() {
    const { nbSteps, progress } = this.props;
    const scrollViewWidth = (nbSteps - 1) * ITEM_WIDTH;
    const interpolatedProgress = progress && progress.interpolate({
      inputRange: [0, scrollViewWidth],
      outputRange: [0, PROGRESS_WIDTH - ROCKET_SIZE - DOT_SIZE],
      extrapolate: 'clamp',
    });

    const animatedStyle = [
      styles.progress,
      { transform: [{ translateX: interpolatedProgress || 0 }] },
    ];

    return (
      <View style={styles.progress}>
        <Animated.View style={animatedStyle}>
          <View style={styles.progressIcon}>
            <Rocket color={PRIMARY_COLOR} size={ROCKET_SIZE} />
          </View>
          <View style={styles.line}>
            <Line width='100%' color={PRIMARY_COLOR} />
          </View>
        </Animated.View>
        <View style={styles.dot}>
          <Dot color={PRIMARY_COLOR} size={DOT_SIZE} />
        </View>
      </View>
    );
  }

  render() {
    const { onClose } = this.props;

    return (
      <Header>
        {this.renderProgressBar()}
        <IconButton
          color='transparent'
          onPress={onClose}
          icon={<Cross color={COLORS.PURPLE} size={SIZES.ICON_SIZE_M} />}
          dynamicSize
        />
      </Header>
    );
  }

}

const styles = createStyleSheet({
  progress: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: PROGRESS_WIDTH,
    height: '100%',
    overflow: 'hidden',
  },
  progressIcon: {
    transform: [{ rotate: '90deg' }],
    backgroundColor: COLORS.WHITE,
  },
  dot: {
    position: 'absolute',
    right: 0,
  },
  line: {
    width: '100%',
    // We merge line with rocket to hide visible pixel separation.
    transform: [
      { scaleX: 1.01 },
      { translateY: -.5 },
    ],
  },
});

export default StepperForm;
