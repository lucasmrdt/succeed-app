// @type

import _ from 'lodash';
import React from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
  animateAtMount?: bool,
  animationOptions?: {
    duration?: number,
    useNativeDriver?: bool,
    easing?: any,
  },
};

export const ANIMATION_OPTIONS = {
  duration: 500,
  easing: Easing.out(Easing.exp),
  useNativeDriver: false,
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
    animateAtMount: true,
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
        ...options,
      }).start();
    });

    return isFirstOccurence ? state : null;
  }
};

export default AnimatedComponent;
