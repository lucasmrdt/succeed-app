// @flow

import React from 'react';
import throttle from 'lodash.throttle';
import { View, Animated, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  State as GestureState,
} from 'react-native-gesture-handler';
import SliderValue from './SliderValue';
import Context from './SliderContext';
import { StylisedText } from '../Text';
import DashedLine from '../Svg/DashedLine';
import { COLORS, SIZES } from '@/constants';
import { Converter } from '@/helpers';
import { createStyleSheet, interpolate } from '@/utils';

import { type StateType as ContextType } from './SliderContext';

const DEFAULT_SIZE = {
  height: 400,
  width: 150,
};

const INDICATOR_HEIGHT = 40;
const INDICATOR_WIDTH = 1 / 4;
const SLIDER_VALUE_SIZE = 'xl';
const SLIDER_VALUE_HEIGHT = 30;
const WRAPPER_PADDING = SLIDER_VALUE_HEIGHT / 2;
const INIT_PROGRESS = 3 / 4;
const MAX_VALUE_LENGTH = 4;
const SCALE_MAX = 1.03;
const LEFT_TEXT_VALUE = 15;

type Props = {
  toValue: number,
  fromValue: number,
  precision: number,
  onReachBorder: Function,
  onEndReachBorder: Function,
  onChangeValue: (value: number) => void,
  size: {
    height: number,
    width: number,
  },
  color: string,
  value: number,
};

class Slider extends Context.Provider<Props, ContextType> {

  _scale = new Animated.Value(1);
  _yPosition: Animated.Value;

  static defaultProps = {
    color: COLORS.GREEN_PASTEL,
    size: DEFAULT_SIZE,
  }

  constructor(props: Props) {
    super(props);
    const { fromValue, toValue, size } = props;
    const sign = Math.sign(fromValue) || 1 * Math.sign(toValue) || 1;
    const averageValue = Math.abs((toValue - fromValue) * INIT_PROGRESS) * sign;

    this._yPosition = new Animated.Value(size.height * (1 - INIT_PROGRESS));
    this._yPosition.addListener(throttle(this.onValueChange, 50));
    this.setValue(averageValue);

    // Mutate state because Provider.
    this.state.precision = this.getPrecision();
  }

  getPrecision() {
    const { precision, toValue } = this.props;
    const nbIntegerDigits = toValue.toFixed(0).length;
    const defaultPrecision = MAX_VALUE_LENGTH - nbIntegerDigits;

    if (precision < defaultPrecision) {
      return precision;
    }
    return defaultPrecision;
  }

  setValue = (value: number) => {
    const { precision } = this.state;
    const nextValue = value.toFixed(precision);

    this.setState((state: State) => {
      if (state.value === nextValue) return null;
      return { value: nextValue };
    });
  }

  onValueChange = ({ value }) => {
    const { size, fromValue, toValue } = this.props;
    const interpolatedValue: number = interpolate(
      fromValue,
      toValue,
      size.height - value, // reverse value because it's natively reversed.
      size.height,
    );

    this.setValue(interpolatedValue);
  }

  onHandlerStateChange = ({ nativeEvent }) => {
    const { state } = nativeEvent;

    if (state === GestureState.BEGAN) {
      Animated.spring(this._scale, {
        speed: 10,
        toValue: SCALE_MAX,
      }).start();
    } else if (state === GestureState.END) {
      Animated.spring(this._scale, {
        speed: 10,
        toValue: 1,
      }).start();
    }
  }

  renderIndicator() {
    const { size, color } = this.props;
    const lineWidth = size.width * INDICATOR_WIDTH;
    const opacity = this._yPosition.interpolate({
      inputRange: [
        0,
        size.height / 2 - INDICATOR_HEIGHT / 2,
        size.height / 2 + INDICATOR_HEIGHT / 2,
        size.height,
      ],
      outputRange: [0, 0, 1, 1],
    });
    const frontStyle = StyleSheet.flatten([
      styles.indicatorChild,
      {
        zIndex: 1,
        opacity,
      },
    ]);

    return (
      <View style={styles.indicator} pointerEvents='none'>
        {/* front layer */}
        <Animated.View style={frontStyle}>
          <DashedLine width={lineWidth} color={color}/>
          <StylisedText color={color} style={styles.indicatorText}>
            daily goal
          </StylisedText>
          <DashedLine width={lineWidth} color={color}/>
        </Animated.View>

        {/* back layer */}
        <View style={styles.indicatorChild}>
          <DashedLine width={lineWidth} color={COLORS.WHITE}/>
          <StylisedText color={COLORS.WHITE} style={styles.indicatorText}>
            daily goal
          </StylisedText>
          <DashedLine width={lineWidth} color={COLORS.WHITE}/>
        </View>
      </View>
    );
  }

  renderSliderValue() {
    const { size } = this.props;
    const right = (SIZES.WIDTH - size.width) / 2 + LEFT_TEXT_VALUE + size.width;
    const translateY = this._yPosition.interpolate({
      inputRange: [0, size.height],
      outputRange: [0, size.height],
      extrapolate: 'clamp',
    });

    const style = StyleSheet.flatten([
      styles.sliderValue,
      {
        right,
        transform: [{ translateY }],
      },
    ]);

    return (
      <SliderValue
        style={style}
        pointerEvents='none'
        size={SLIDER_VALUE_SIZE}
      />
    );
  }

  renderSlider() {
    const { color, size } = this.props;
    const translateY = this._yPosition.interpolate({
      inputRange: [0, size.height],
      outputRange: [0, size.height],
      extrapolate: 'clamp',
    });

    const style = StyleSheet.flatten([
      styles.slider,
      {
        backgroundColor: color,
        transform: [{ translateY }],
      },
    ]);

    return (
      <Animated.View
        style={style}
        pointerEvents='none'
      />
    );
  }

  render() {
    const { size, color } = this.props;
    const backgroundColor = Converter.rgbWithOpacity(color, .11);

    const wrapperStyle = StyleSheet.flatten([
      styles.wrapper,
      {
        paddingTop: WRAPPER_PADDING,
        paddingBottom: WRAPPER_PADDING,
        height: size.height + WRAPPER_PADDING * 2,
        transform: [{ scale: this._scale }],
      },
    ]);
    const backgroundStyle = StyleSheet.flatten([
      styles.background,
      {
        backgroundColor,
        width: size.width,
      },
    ]);

    return (
      <PanGestureHandler
        onHandlerStateChange={this.onHandlerStateChange}
        onGestureEvent={Animated.event(
          [{nativeEvent: { y: this._yPosition }}],
          { useNativeDriver: true },
        )}
      >
        <Animated.View style={wrapperStyle}>
          <View style={backgroundStyle}>
            {this.renderIndicator()}
            {this.renderSlider()}
          </View>
          {this.renderSliderValue()}
        </Animated.View>
      </PanGestureHandler>
    );
  }

};

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    height: '100%',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderValue: {
    top: WRAPPER_PADDING - SLIDER_VALUE_HEIGHT / 2,
    height: SLIDER_VALUE_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorChild: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: INDICATOR_HEIGHT,
    zIndex: 1,
    top: '50%',
    transform: [{ translateY: -INDICATOR_HEIGHT / 2 }],
  },
  indicatorText: {
    fontSize: 13,
    width: '50%',
  },
});

export default Slider;
