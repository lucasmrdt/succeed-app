// @flow

import React from 'react';
import { View, Easing, StyleSheet } from 'react-native';
import { onlyUpdateForKeys } from 'recompose';
import * as Utils from '@/utils';
import * as Constants from '@/constants';
import AnimatedButton from './AnimatedButton';
import { type RNTypes } from '@/types';

type Props = {
  onPress: (id: string) => void,
  size: { height: number, width: number },
  rounded?: 'fully' | 'little',
  animateAtMount?: bool,
  animationOptions?: {
    duration?: number,
    useNativeDriver?: bool,
    easing?: any,
  },
  color?: string,
  id?: string,
  children?: React.Component,
  light?: bool,
};

const AnimatedRoundedButton = (props: Props) => {
  const { size, ...otherProps } = props;
  const style = getStyle(props);

  return (
    <AnimatedButton
      animatedHeight={size.height}
      animatedWidth={size.width}
      {...otherProps}
      style={style}
    />
  );
};

AnimatedRoundedButton.defaultProps = {
  color: Constants.COLORS.GREEN,
  id: null,
  light: false,
  children: null,
  rounded: 'little',
  animateAtMount: true,
  animationOptions: {
    duration: 500,
    easing: Easing.out(Easing.back(1.5)),
  },
};

const styles = Utils.createStyleSheet({
  global: Constants.STYLES.ROUNDED_BUTTON,
});

const getStyle = ({ color, light, rounded }: Props) => {
  const style = {
    backgroundColor: light ? 'transparent' : color,
    borderColor: light ? color : 'transparent',
    borderRadius: rounded === 'fully' ? 100 : 6,
  };

  return [ styles.global, style ];
}

const OptimizedAnimatedRoundedButton = (
  onlyUpdateForKeys(['size', 'color', 'light'])(AnimatedRoundedButton)
);

export default OptimizedAnimatedRoundedButton;
