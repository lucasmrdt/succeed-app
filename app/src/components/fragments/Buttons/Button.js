// @flow

import React from 'react';
import { Transition } from 'react-navigation-fluid-transitions';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet } from '@/utils';
import { ANIMATIONS, STYLES,COLORS } from '@/constants';
import { type RNTypes } from '@/types';

const FULLY_ROUNDED_BORDER_RADIUS = 100;
const LITTLE_ROUNDED_BORDER_RADIUS = 6;

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

class Button extends React.Component<Props> {
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
    return true;
  }

  _computeStyle() {
    const {
      style,
      size,
      rounded,
      color,
      light,
    } = this.props;

    const borderRadius = (rounded === 'fully'
      ? FULLY_ROUNDED_BORDER_RADIUS
      : LITTLE_ROUNDED_BORDER_RADIUS
    );

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      style,
      styles.wrapper,
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
        width: size.width,
        height: size.height,
        backgroundColor: !light ? color : 'transparent',
        borderRadius,
      },
    ];

    return {
      wrapper: wrapperStyle,
      button: buttonStyle,
    };
  }

  _onPress = () => {
    const { onPress, id } = this.props;
    onPress(id);
  }

  render() {
    const { children, id: buttonId } = this.props;
    const style = this._computeStyle();

    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
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
    position: 'relative',
  },
  button: {
    position: 'absolute',
  },
});

export default Button;
