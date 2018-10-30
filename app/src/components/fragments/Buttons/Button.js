// @flow

import React from 'react';
import PropTypes from 'prop-types';
import AnimatedButton from './AnimatedButton';
import Touchable from './Touchable';
import { createStyleSheet } from '@/utils';
import { SIZES, COLORS, STYLES } from '@/constants';

import { type TouchableProps } from './Touchable';
import { type StylesheetType } from '@/types/rnTypes';

type Props = TouchableProps & {
  size: { height: number, width: number },
  color: string,
  optimized: bool,
  rounded: 'fully' | 'little',
  light: bool,
  dynamicSize: bool,
  children: React$Element<any>,
};

class Button extends React.PureComponent<Props> {
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

  // TODO: Remove it!
  // shouldComponentUpdate(nextProps: Props) {
  //   const { size, color, light, ch } = this.props;

  //   return (nextProps.size.height !== size.height
  //   || nextProps.size.width !== size.width
  //   || nextProps.color !== color
  //   || nextProps.light !== light);
  // }

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

    const computedStyle: Array<StylesheetType> = [
      styles.wrapper,
      style,
      {
        backgroundColor: !light ? color : 'transparent',
        borderColor: !light ? 'transparent' : color,
        borderRadius,
      },
      // $FlowFixMe
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
      ? Touchable
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
