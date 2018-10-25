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
  size: { height: number, width: number },
  color: string,
  optimized?: bool,
  rounded?: 'fully' | 'little',
  light?: bool,
  dynamicSize?: bool,
  children: React$Element<any>,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    color: COLORS.GREEN,
    light: false,
    rounded: 'little',
    optimized: false,
    dynamicSize: false,
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
    rounded: PropTypes.oneOf(['fully', 'little']),
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
    const { optimized, dynamicSize, size } = this.props;

    if (optimized || dynamicSize) {
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
      dynamicSize,
    } = this.props;

    const borderRadius = (rounded === 'fully'
      ? STYLES.FULLY_ROUNDED_BORDER_RADIUS
      : STYLES.LITTLE_ROUNDED_BORDER_RADIUS
    );

    const computedStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      style,
      {
        backgroundColor: !light ? color : 'transparent',
        borderColor: !light ? 'transparent' : color,
        borderRadius,
      },
      !dynamicSize && {
        height: size.height,
        width: size.width,
      },
    ];

    return computedStyle;
  }

  render() {
    const { optimized, dynamicSize, ...props } = this.props;
    const propsSize = this.getPropsSize();
    const style = this.computeStyle();
    const Button = (optimized || dynamicSize
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
