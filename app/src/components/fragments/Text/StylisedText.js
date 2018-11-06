// @flow

import React from 'react';
import { Text, Platform } from 'react-native';
import { COLORS, SIZES, STYLES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';

type Props = {
  children: React$Element<any>,
  style: StylesheetType,
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
  type: 'normal' | 'bold' | 'light',
  letterSpacing: number,
  color: string,
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

    const fontSize = SIZES.TEXT_SIZES[size];

    const wrapperStyle: Array<StylesheetType> = [
      styles.wrapper,
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
      <Text style={style} allowFontScaling>
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
    marginTop: 2,
  },
});

export default StylisedText;
