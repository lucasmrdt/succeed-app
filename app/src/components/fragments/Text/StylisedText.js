// @flow

import React from 'react';
import { Text, Platform } from 'react-native';
import { COLORS, SIZES, STYLES } from '@/constants';
import { createStyleSheet } from '@/utils';

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

    const lineHeight = SIZES.LINE_TEXT_HEIGHTS[size];
    const fontSize = SIZES.TEXT_SIZES[size];

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      {
        fontSize,
        fontFamily,
        color,
        ...Platform.select({
          ios: {
            lineHeight,
          },
        }),
        // letterSpacing,
      },
      styles.wrapper,
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

const styles = createStyleSheet({
  wrapper: {
    ...STYLES.CENTER_CHILDS,
    alignSelf: 'center',
    textAlign: 'center',
    ...Platform.select({
      android: {
        lineHeight: 50,
        marginTop: 4,
      },
    }),
  },
});

export default StylisedText;
