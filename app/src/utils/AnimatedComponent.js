// @type

import _ from 'lodash';
import React from 'react';
import { Animated } from 'react-native';

type Props = {
  animateAtMount?: bool,
  animationOptions?: {
    duration?: number,
  },
};

const ANIMATION_OPTIONS = {
  duration: 500,
  useNativeDriver: true,
};

/**
 * HOW TO USE ?
 * -> Prefix any props with 'animated'. Then get the value from state.
 * eg. animatedHeight.
 */
class AnimatedComponent<RefProps, RefState> extends React.Component<Props> {
  state : RefState = {};
  props : RefProps & Props;

  static defaultProps = {
    animationOptions: {},
    animateAtMount: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: RefState) {
    let state = prevState;

    const isFirstOccurence = _.isEmpty(state);
    const { animationOptions, animateAtMount } = nextProps;
    const options = { ...ANIMATION_OPTIONS, ...animationOptions };
    const animatedProps = _.pickBy(nextProps, (val, key) => (
      key.match(/^animated.*/)
    ));

    if (isFirstOccurence) {
      state = _.mapValues(animatedProps, val => (
        new Animated.Value(animateAtMount ? 0 : val)
      ));

      if (!animateAtMount) return state;
    }

    _.forEach(animatedProps, (value, key) => {
      Animated.timing(state[key], {
        toValue: nextProps[key],
        duration: options.duration,
      }).start();
    });

    return isFirstOccurence ? state : null;
  }
};

export default AnimatedComponent;
