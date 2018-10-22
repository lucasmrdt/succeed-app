// @flow

import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { StylisedText } from '../Text';
import * as Icons from '@/assets/icons';
import { STYLES, COLORS } from '@/constants';
import { getIcon, createStyleSheet } from '@/utils';

import { type RNTypes } from '@/types';
import { type ButtonProps } from './Button';

const LETTER_SPACING = 1;
const MARGIN_BETWEEN_TEXT_ICON = 5;
const ICON_SIZE = 20;

type Props = ButtonProps & {
  icon?: string,
  selected?: bool,
  color?: string,
  textStyle?: RNTypes.StylesheetType,
};

class ButtonWithIcon extends React.PureComponent<Props> {
  static defaultProps = {
    selected: false,
    color: COLORS.GREEN,
    icon: null,
    textStyle: STYLES.TEXT,
  };

  renderIcon(color) {
    const { icon } = this.props;
    const Icon = getIcon(icon);

    if (!Icon) {
      return null;
    }
    return (
      <View style={styles.icon}>
        <Icon size={ICON_SIZE} color={color} />
      </View>
    );
  }

  render() {
    const {
      children,
      icon,
      style,
      textStyle,
      selected,
      color,
      ...props
    } = this.props;
    const childColor = (selected ? color : COLORS.WHITE);

    return (
      <Button
        {...props}
        color={color}
        light={selected}
        style={[ styles.wrapper, style ]}
      >
        {this.renderIcon(childColor)}
        <StylisedText
          style={textStyle}
          color={childColor}
          letterSpacing={LETTER_SPACING}
        >
          {children}
        </StylisedText>
      </Button>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    ...STYLES.CENTER_CHILDS,
    position: 'relative',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: '10%',
  },
});

export default ButtonWithIcon;
