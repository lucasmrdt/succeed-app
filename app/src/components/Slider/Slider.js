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
import { StylisedText, DashedLine, AnimatedColor } from '@/components/fragments';
import { COLORS, SIZES } from '@/constants';
import { Converter } from '@/helpers';
import { createStyleSheet, interpolate } from '@/utils';

import { type StateType as ContextType } from './SliderContext';

const DEFAULT_SIZE = {
  height: 375,
  width: 175,
};

const INDICATOR_HEIGHT = 40;
const INDICATOR_WIDTH = 1 / 4;
const SLIDER_VALUE_SIZE = 'xl';
const SLIDER_VALUE_HEIGHT = 30;
const WRAPPER_PADDING = SLIDER_VALUE_HEIGHT / 2;
const MAX_VALUE_LENGTH = 4;
const SCALE_MAX = 1.04;
const LEFT_TEXT_VALUE = 15;

type Props = {
  value: number,
  toValue: number,
  fromValue: number,
  precision: number,
  inverted: bool,
  size: {
    height: number,
    width: number,
  },
};

class Slider extends Context.Provider<Props, ContextType> {

  _scale = new Animated.Value(1);
  _yPosition = new Animated.Value(0);

  static defaultProps: Props = {
    color: COLORS.GREEN_PASTEL,
    size: DEFAULT_SIZE,
    precision: 0,
    inverted: false,
  }

  constructor(props: Props) {
    super(props);

  }

  componentDidMount() {
    this.setupPrecision();
    this.setupInitValue();
    this._yPosition.addListener(throttle(this.onChangeValue, 50));
  }

  componentWillUnmount() {
    this._yPosition.removeAllListeners();
  }

  get inputRange() {
    const { size } = this.props;
    return [0, size.height];
  }

  setupInitValue() {
    const { fromValue, toValue, value, size } = this.props;
    let initValue = value || toValue;

    const yPosition: number = interpolate(
      0,
      size.height,
      toValue - initValue,
      // Invert, yPosition === 0 where user complete 100%.
      toValue - fromValue,
    );
    this._yPosition.setValue(yPosition);
    this.setValue(initValue);
  }

  setupPrecision() {
    const { precision, toValue } = this.props;
    const nbIntegerDigits = toValue.toFixed(0).length;
    const defaultPrecision = MAX_VALUE_LENGTH - nbIntegerDigits;
    const finalPrecision = (precision < defaultPrecision
      ? precision
      : defaultPrecision
    );

    this.setState({ precision: finalPrecision });
  }

  setValue = (value: number) => {
    const { precision } = this.state;
    const nextValue = value.toFixed(precision);

    this.setState((state: State) => {
      if (state.value === nextValue) return null;
      return { value: nextValue };
    });
  }

  dispatchChangeValue = () => {
    const { onChangeValue } = this.props;
    const { value } = this.state;

    onChangeValue(value);
  };

  onChangeValue = ({ value }) => {
    const { size, fromValue, toValue } = this.props;
    const interpolatedValue: number = interpolate(
      fromValue,
      toValue,
      // Invert, yPosition === 0 where user complete 100%.
      size.height - value,
      size.height,
    );

    this.setValue(interpolatedValue);
  }

  onHandlerStateChange = ({ nativeEvent }) => {
    const { state } = nativeEvent;

    if (state === GestureState.BEGAN) {
      Animated.spring(this._scale, {
        speed: 6,
        toValue: SCALE_MAX,
        useNativeDriver: true,
      }).start();
    } else if (state === GestureState.END) {
      Animated.spring(this._scale, {
        speed: 6,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }

  renderIndicator() {
    const { size } = this.props;
    const lineWidth = size.width * INDICATOR_WIDTH;
    const inputRange = [
      0,
      size.height / 2 - INDICATOR_HEIGHT / 2,
      size.height / 2 + INDICATOR_HEIGHT / 2,
      size.height,
    ];

    return (
      <AnimatedColor
        fromColor={COLORS.GRAY}
        toColor={COLORS.WHITE}
        animatedValue={this._yPosition}
        inputRange={inputRange}
        style={styles.indicator}
        pointerEvents='none'
      >
        <DashedLine width={lineWidth}/>
        <StylisedText style={styles.indicatorText}>
          daily goal
        </StylisedText>
        <DashedLine width={lineWidth}/>
      </AnimatedColor>
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

    const wrapperStyle = StyleSheet.flatten([
      styles.sliderValue,
      {
        right,
        transform: [{ translateY }],
      },
    ]);

    return (
      <SliderValue
        style={wrapperStyle}
        color={COLORS.GRAY}
        size={SLIDER_VALUE_SIZE}
        pointerEvents='none'
      />
    );
  }

  renderSlider() {
    const { inverted } = this.props;
    const translateY = this._yPosition.interpolate({
      inputRange: this.inputRange,
      outputRange: this.inputRange,
      extrapolate: 'clamp',
    });
    const colorInputRange = (inverted
      ? this.inputRange.reverse()
      : this.inputRange
    );

    const style = StyleSheet.flatten([
      styles.slider,
      { transform: [{ translateY }] },
    ]);

    return (
      <AnimatedColor
        animatedValue={this._yPosition}
        inputRange={colorInputRange}
        fromColor={COLORS.ORANGE}
        toColor={COLORS.GREEN}
        style={style}
        colorKeyProp='backgroundColor'
        pointerEvents='none'
        wrapInStylesheet
      >
        <View style={styles.absolute} />
      </AnimatedColor>
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
      <Animated.View style={wrapperStyle}>
        <PanGestureHandler
          onHandlerStateChange={this.onHandlerStateChange}
          onGestureEvent={Animated.event(
            [{nativeEvent: { y: this._yPosition }}],
            { useNativeDriver: true },
          )}
        >
          <Animated.View style={backgroundStyle}>
            {this.renderIndicator()}
            {this.renderSlider()}
          </Animated.View>
        </PanGestureHandler>
        {this.renderSliderValue()}
      </Animated.View>
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
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
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
    width: 60,
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
