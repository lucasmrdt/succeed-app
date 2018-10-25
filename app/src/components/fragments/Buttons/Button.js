// @flow

import React from 'react';
import PropTypes from 'prop-types';
import AnimatedButton from './AnimatedButton';
import StaticButton from './StaticButton';
import { createStyleSheet } from '@/utils';
import { SIZES, COLORS, STYLES } from '@/constants';

import { type TouchableProps } from './Touchable';
import { type RNTypes } from '@/types';

type Props = TouchableProps & {
  color?: string,
  size?: { height: number, width: number },
  optimized?: bool,
  rounded?: 'fully' | 'little',
  light?: bool,
  dynamicWidth?: bool,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    color: COLORS.GREEN,
    light: false,
    rounded: 'little',
    optimized: false,
    dynamicWidth: false,
    size: {
      width: SIZES.DEFAULT_BUTTON_WIDTH,
      height: SIZES.DEFAULT_BUTTON_HEIGHT,
    },
  }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
    color: PropTypes.string,
    rounder: PropTypes.oneOf(['fully', 'little']),
    light: PropTypes.bool,
    style: PropTypes.any,
    id: PropTypes.string,
  }

  shouldComponentUpdate(nextProps: Props) {
    const { size, color, light } = this.props;

    return (nextProps.size.height !== size.height
    || nextProps.size.width !== size.width
    || nextProps.color !== color
    || nextProps.light !== light)
  }

  getPropsSize() {
    const { optimized, dynamicWidth, size } = this.props;

    if (optimized || dynamicWidth) {
      return { size };
    }
    return {
      animatedWidth: size.width,
      animatedHeight: size.height,
    };
  }

  computeStyle() {
    const {
      style,
      size,
      rounded,
      color,
      light,
      dynamicWidth,
    } = this.props;

    const borderRadius = (rounded === 'fully'
      ? STYLES.FULLY_ROUNDED_BORDER_RADIUS
      : STYLES.LITTLE_ROUNDED_BORDER_RADIUS
    );

    const computedStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      style,
      {
        height: size.height,
        backgroundColor: !light ? color : 'transparent',
        borderColor: !light ? 'transparent' : color,
        borderRadius,
      },
      !dynamicWidth && {
        width: size.width,
      },
    ];

    return computedStyle;
  }

  render() {
    const { optimized, dynamicWidth, ...props } = this.props;
    const propsSize = this.getPropsSize();
    const style = this.computeStyle();
    const Button = (optimized || dynamicWidth
      ? StaticButton
      : AnimatedButton
    );

    return (
      <Button
        {...props}
        {...propsSize}
        style={style}
      />
    );
  }
}

const styles = createStyleSheet({
  wrapper: STYLES.BUTTON,
});

export type ButtonProps = Props;
export default Button;
