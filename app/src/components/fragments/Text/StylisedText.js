// @flow

import React from 'react';
import { Text } from 'react-native';
import { COLORS, SIZES } from '@/constants';

import { type RNTypes } from '@/types';

type Props = {
  style?: RNTypes.StylesheetType,
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
  type?: 'normal' | 'bold' | 'light',
  letterSpacing?: number,
  color?: string,
};

class StylisedText extends React.PureComponent<Props> {
  static defaultProps = {
    style: null,
    size: 'm',
    type: 'normal',
    letterSpacing: 0,
    color: COLORS.GREEN,
  }

  computeStyle() {
    const {
      type,
      size,
      letterSpacing,
      color,
      style,
    } = this.props;

    let fontFamily = 'poppins';
    if (type === 'bold') {
      fontFamily = 'poppins-bold';
    } else if (type === 'italic') {
      fontFamily = 'poppins-light';
    }

    const fontSize = SIZES.TEXT_SIZE[size] || SIZES.TEXT_SIZE.m;

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      {
        fontSize,
        fontFamily,
        color,
        letterSpacing,
      },
      style,
    ];

    return wrapperStyle;
  }

  render() {
    const { children } = this.props;
    const style = this.computeStyle();

    return (
      <Text style={style}>
        {children}
      </Text>
    );
  }
}

export default StylisedText;
