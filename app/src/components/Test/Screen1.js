// @flow

import React from 'react';
import { Text, View, Animated } from 'react-native';
import {
  AnimatedRoundedButton,
  ProgressBar,
  HorizontalProgress,
} from '@/components/fragments';
import { RNTypes } from '@/types';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

type Props = RNTypes.NavigationInjectedProps;

class Test extends React.Component<Props> {
  state = {
    progress: .1,
  }

  onPress = () => {
    this.props.navigation.push('Screen2');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* <AnimatedRoundedButton
          rounded='fully'
          size={{ width: 200, height: 50 }}
          onPress={this.onPress}
          color={Constants.COLORS.GREEN}
          id='ok'
        >
          <Text>1</Text>
          <Text>2</Text>
        </AnimatedRoundedButton> */}
        <HorizontalProgress
          progress={1}
          text='petit test'
          size='l'
        />
        <ProgressBar
          animateAtMount
          animatedProgress={1}
          size={{ width: 200, height: 30 }}
          color={Constants.COLORS.GREEN}
          renderText={p => <Animated.Text style={{ color: 'white' }}>{`${Math.round(p * 100)} / 100`}</Animated.Text>}
        />
      </View>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
});

export default Test;

