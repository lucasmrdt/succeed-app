// @flow

import React from 'react';
import { View } from 'react-native';
import Button from './Button';
import { StylisedText } from '../Text';
import { STYLES, COLORS, SIZES } from '@/constants';
import { getIcon, createStyleSheet, isReactComponent } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';
import { type IconTypes } from '@/types/dataTypes';
import { type ButtonProps } from './Button';

const LETTER_SPACING = 1;

type Props = ButtonProps & {
  iconSize: number,
  color: string,
  leftIcon: IconTypes,
  rightIcon: IconTypes,
  fontSize: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
  fontType: 'normal' | 'bold' | 'light',
  justify: 'left' | 'space-between',
  light: bool,
  textStyle: StylesheetType,
};

class StylisedButton extends React.PureComponent<Props> {

  static defaultProps = {
    leftIcon: null,
    rightIcon: null,
    iconSize: SIZES.ICON_SIZE_M,
    light: false,
    fontType: 'normal',
    color: COLORS.GREEN,
    icon: null,
    fontSize: 'm',
    textStyle: STYLES.TEXT,
    justify: 'left',
  };

  renderIcon(color: string, renderIcon: IconTypes) {
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
          : (typeof renderIcon === 'function') && renderIcon(color)
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
      fontType,
      light,
      justify,
      color,
      ...props
    } = this.props;
    const childColor = (light ? color : COLORS.WHITE);

    const computedStyle: Array<StylesheetType> = [
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
        {children && (
          <StylisedText
            type={fontType}
            size={fontSize}
            style={textStyle}
            color={childColor}
            letterSpacing={LETTER_SPACING}
          >
            {children}
          </StylisedText>
        )}
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

export default StylisedButton;
