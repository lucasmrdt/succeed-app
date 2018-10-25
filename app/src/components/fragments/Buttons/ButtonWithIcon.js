// @flow

import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { StylisedText } from '../Text';
import * as Icons from '@/assets/icons';
import { STYLES, COLORS, SIZES } from '@/constants';
import { getIcon, createStyleSheet, isReactComponent } from '@/utils';

import {
  type RNTypes,
  type DataTypes,
} from '@/types';
import { type ButtonProps } from './Button';

const LETTER_SPACING = 1;
const MARGIN_BETWEEN_TEXT_ICON = 5;

type Props = ButtonProps & {
  iconSize: number,
  color: string,
  leftIcon?: DataTypes.IconTypes,
  rightIcon?: DataTypes.IconTypes,
  fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
  justify?: 'left' | 'space-between',
  light?: bool,
  textStyle?: RNTypes.StylesheetType,
};

class ButtonWithIcon extends React.PureComponent<Props> {

  static defaultProps = {
    leftIcon: null,
    rightIcon: null,
    iconSize: SIZES.ICON_SIZE_M,
    light: false,
    color: COLORS.GREEN,
    icon: null,
    fontSize: 'm',
    textStyle: STYLES.TEXT,
    justify: 'left',
  };

  renderIcon(color: string, renderIcon: DataTypes.IconTypes) {
    const { justify, iconSize, dynamicSize } = this.props;
    const Icon = getIcon(renderIcon);

    const transform = [{ translateX: -iconSize / 2 }];
    const style = (justify === 'left'
      ? [
        styles.icon,
        dynamicSize && { transform },
      ]
      : null
    );

    if (!Icon) {
      return null;
    }
    return (
      <View style={style}>
        {isReactComponent(Icon)
          // $FlowFixMe don't understand...
          ? <Icon size={iconSize} color={color} />
          : renderIcon(color)
        }
      </View>
    );
  }

  render() {
    const {
      children,
      leftIcon,
      rightIcon,
      style,
      textStyle,
      fontSize,
      light,
      justify,
      color,
      ...props
    } = this.props;
    const childColor = (light ? color : COLORS.WHITE);

    const computedStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      style,
      {
        justifyContent: (justify === 'space-between'
          ? 'space-between'
          : 'center'
        ),
      },
    ];

    return (
      <Button
        color={color}
        light={light}
        style={computedStyle}
        {...props}
      >
        {this.renderIcon(childColor, leftIcon)}
        <StylisedText
          size={fontSize}
          style={textStyle}
          color={childColor}
          letterSpacing={LETTER_SPACING}
        >
          {children}
        </StylisedText>
        {this.renderIcon(childColor, rightIcon)}
      </Button>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '10%',
  },
});

export default ButtonWithIcon;
