// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
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
  gradient: bool,
  dynamicSize: bool,
  children: React$Element<any>,
  background: React$Element<any>,
  attractive: bool,
};

class Button extends React.PureComponent<Props> {
  static defaultProps = {
    attractive: false,
    color: COLORS.GREEN,
    light: false,
    rounded: 'little',
    optimized: false,
    gradient: false,
    dynamicSize: false,
    background: null,
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

  renderGradient() {
    return (
      <LinearGradient
        style={styles.gradient}
        start={{ x: 0, y: .5 }}
        end={{ x: 1, y: .5 }}
        colors={['rgba(0, 0, 0, .06)', 'rgba(255, 255, 255, .06)']}
      />
    );
  }

  render() {
    const { optimized, dynamicSize, gradient, ...props } = this.props;
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
        background={gradient && this.renderGradient()}
        style={style}
      />
    );
  }
}

const styles = createStyleSheet({
  wrapper: STYLES.BUTTON,
  gradient: {
    position: 'absolute',
    // usually wrapped in View with padding
    // eg. View with padding of 10 give 100% - 20.
    // so not really 100%.
    // TODO: Find less tricky fix.
    width: '200%',
    height: '200%',
    left: '-5%',
    top: '-5%',
  },
});

export type ButtonProps = Props;
export default Button;
