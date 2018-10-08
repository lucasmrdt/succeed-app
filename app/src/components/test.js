import React from 'react';
import { View, Animated } from 'react-native';
import AnimatedComponent from '../utils/AnimatedComponent';

type Props = {
  animatedWidth: number,
  animatedHeight: number,
};

type State = Props;

class Test extends AnimatedComponent<Props, State> {
  render() {
    const { animatedWidth, animatedHeight } = this.state;
    console.log(animatedHeight)
    return (
      <Animated.View
        style={{
          backgroundColor: 'blue',
          height: animatedHeight,
          width: animatedWidth,
        }}
      />
    );
  }
};

export default Test;
