// @flow

import React from 'react';
import { View, Animated } from 'react-native';
import { onlyUpdateForKeys } from 'recompose';
import * as Utils from '@/utils';
import * as Constants from '@/constants';
import Button from './Button';
import { type RNTypes } from '@/types';

type Props = {
  onPress: (id: string) => void,
  size: { height: number, width: number },
  rounded?: 'fully' | 'little',
  color?: string,
  id?: string,
  children?: React.Component,
  light?: bool,
};

const RoundedButton = (props: Props) => {
  const style = getStyle(props);

  return (<Button {...props} style={style} />);
};

RoundedButton.defaultProps = {
  color: Constants.COLORS.GREEN,
  id: null,
  light: false,
  children: null,
};

const styles = Utils.createStyleSheet({
  global: Constants.STYLES.ROUNDED_BUTTON,
});

const getStyle = ({ size, color, light, rounded }: Props) => {
  const style = {
    height: size.height,
    width: size.width,
    backgroundColor: light ? 'transparent' : color,
    borderColor: light ? color : 'transparent',
    borderRadius: rounded === 'fully' ? 100 : 6,
  };

  return [ styles.global, style ];
}

const OptimizedRoundedButton = (
  onlyUpdateForKeys(['size', 'color', 'light'])(RoundedButton)
);

export default OptimizedRoundedButton;
