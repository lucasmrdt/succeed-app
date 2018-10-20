// @flow
/**
 * Why this component is created ?
 * It's allow you to use the simplest stylised button
 * for you app without any animation. (usefull in FlatList for example).
 * It's optimized component.
 * It's also used with fluid-transition for expense to the window
 * size for example.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { createStyleSheet } from '@/utils';
import { ANIMATIONS, STYLES, COLORS } from '@/constants';
import { type RNTypes } from '@/types';

type Props = {
  onPress: (id: string) => void,
  size: { height: number, width: number },
  color?: string,
  rounded?: 'fully' | 'little',
  light?: bool,
  id?: string | null,
  children?: React.Component,
  style?: RNTypes.StylesheetType,
};

class StaticButton extends React.Component<Props> {
  static defaultProps = {
    color: COLORS.GREEN,
    rounded: 'little',
    light: false,
    id: null,
    style: null,
  };

  static propTypes = {
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    rounder: PropTypes.oneOf(['fully', 'little']),
    light: PropTypes.bool,
    style: PropTypes.any,
    id: PropTypes.string,
  };

  shouldComponentUpdate() {
    // We never refresh component, we suppose that it's static component.
    return false;
  }

  computeStyle() {
    const {
      style,
      size,
      rounded,
      color,
      light,
    } = this.props;

    const borderRadius = (rounded === 'fully'
      ? STYLES.FULLY_ROUNDED_BORDER_RADIUS
      : STYLES.LITTLE_ROUNDED_BORDER_RADIUS
    );

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      style,
      {
        width: size.width,
        height: size.height,
        borderColor: !light ? 'transparent' : color,
        borderRadius,
      },
    ];
    const buttonStyle: Array<RNTypes.StylesheetType> = [
      styles.button,
      {
        backgroundColor: !light ? color : 'transparent',
        borderRadius,
      },
    ];

    return {
      wrapper: wrapperStyle,
      button: buttonStyle,
    };
  }

  onPress = () => {
    const { onPress, id } = this.props;
    onPress(id);
  }

  render() {
    const { children, id: buttonId } = this.props;
    const style = this.computeStyle();

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
      >
        <View style={style.wrapper}>
          <Transition shared={buttonId}>
            <View style={style.button}/>
          </Transition>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = createStyleSheet({
  wrapper: {
    ...STYLES.BUTTON,
  },
  button: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export const staticButtonStyles = styles;
export default StaticButton;
