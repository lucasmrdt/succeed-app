// @flow

import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';
import DashedLine from '../Svg/DashedLine';
import { COLORS } from '@/constants';
import { Converter } from '@/helpers';
import { createStyleSheet, interpolate } from '@/utils';
import Context from '@/helpers/context';

const context = new Context({});

const DEFAULT_SIZE = {
  height: 450,
  width: 200,
};
const TEXT_HEIGHT = 40;
const SCALE_MAX = 1.03;

type Props = {
  onReachBorder: Function,
  onEndReachBorder: Function,
  onChangeValue: (value: number) => void,
  size: {
    height: number,
    width: number,
  },
  color: string,
  value: number,
  dailyGoal: number,
  valueMax: number,
  valueMin: number,
};

type State = {
  value: number,
  graduation: number,
};

@context.withContext('value')
class Value extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    return (
      <Animated.Text {...props}>{value}</Animated.Text>
    );
  }
}

class RangeInput extends context.Provider<Props> {

  static defaultProps = {
    color: COLORS.GREEN_PASTEL,
    size: DEFAULT_SIZE,
  }

  constructor(props: Props) {
    super(props);
    this.initState(props);
    // this.initPositionY = new Animated.Value(props.size.height / 2);
    // this.initPositionY.addListener(this.onInitValueChange);
    // this.animatedY.addListener(this.onAnimatedValueChange);
  }

  // initPositionY: Animated.Value;
  animatedY = new Animated.Value(0);
  animatedScale = new Animated.Value(1);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetResponderCapture: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (...args) => this.onEnd(...args),
    onPanResponderStart: (...args) => this.onStart(...args),
    onPanResponderMove: (...args) => this.onMove(...args),
    //Animated.event([null, { dy: this.animatedY }]),
  });

  // get yPosition() {
  //   return Animated.add(this.initPositionY, this.animatedY);
  // }

  initState(props: Props) {
    this.state.graduation = .02 * (props.valueMax - props.valueMin);
    this.state.value = Math.round((props.valueMax - props.valueMin) / 2);
  }

  // onInitValueChange = ({ value }) => {
  //   this.onValueChange(value);
  // }

  // onAnimatedValueChange = ({ value }) => {
  //   const finalValue = this.initPositionY.__getValue() + value;
  //   this.onValueChange(finalValue);
  // }

  // onValueChange = (value) => {
  //   const { size, valueMin, valueMax } = this.props;
  //   const { graduation } = this.state;
  //   const interpolatedValue = interpolate(
  //     valueMin,
  //     valueMax,
  //     size.height - value, // reverse value because it's natively reversed.
  //     size.height,
  //   );

  //   const nextValue = Math.round(
  //     Math.round(interpolatedValue / graduation) * graduation * 100,
  //   ) / 100;
  //   this.setState((state: State) => {
  //     if (state.value === nextValue) return null;
  //     return { value: nextValue };
  //   });
  // }

  onStart = ({ nativeEvent }) => {
    // this.animatedY.setValue(0);
    // this.initPositionY.setValue(nativeEvent.locationY);
    Animated.spring(this.animatedScale, {
      speed: 100,
      toValue: SCALE_MAX,
    }).start();
  }

  onMove = ({ nativeEvent }) => {
    this.animatedY.setValue(nativeEvent.locationY);
    this.setValue(nativeEvent.locationY);
  }

  onEnd = ({ nativeEvent }) => {
    const { onChangeValue, size, valueMax } = this.props;
    const value = nativeEvent.locationY * valueMax / size.height;

    // onChangeValue(value);
    Animated.spring(this.animatedScale, {
      speed: 100,
      toValue: 1,
    }).start();
  }

  setValue(value) {
    return;
    const { size, valueMin, valueMax } = this.props;
    const { graduation } = this.state;
    const interpolatedValue = interpolate(
      valueMin,
      valueMax,
      size.height - value, // reverse value because it's natively reversed.
      size.height,
    );

    const nextValue = Math.round(
      Math.round(interpolatedValue / graduation) * graduation * 1000,
    ) / 1000;
    this.setState((state: State) => {
      if (state.value === nextValue) return null;
      return { value: nextValue };
    });
  }

  renderLineIndicator() {
    const { dailyGoal, size, color } = this.props;
    const lineWidth = size.width * .25;
    const animatedColor = this.animatedY.interpolate({
      inputRange: [0, size.height / 2, size.height / 2 + 1, size.height],
      outputRange: [COLORS.WHITE, COLORS.WHITE, color, color],
    });

    const textStyle = StyleSheet.flatten([
      styles.lineIndicatorText,
      { color: animatedColor },
    ]);

    return (
      <View
        style={styles.lineIndicator}
        pointerEvents='none'
      >
        <DashedLine width={lineWidth} color={animatedColor}/>
        <Animated.Text style={textStyle}>
          {`daily goal ${dailyGoal}`}
        </Animated.Text>
        <DashedLine width={lineWidth} color={animatedColor}/>
      </View>
    );
  }

  renderIndicator() {
    const { color, size } = this.props;
    const translateY = this.animatedY.interpolate({
      inputRange: [0, size.height],
      outputRange: [0, size.height],
      extrapolate: 'clamp',
    });

    const style = StyleSheet.flatten([
      styles.indicator,
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

  renderText() {
    const { color, size } = this.props;
    const topPosition = size.height * .25 - TEXT_HEIGHT / 2;
    const bottomPosition = size.height * .75 - TEXT_HEIGHT / 2;
    const animatedColor = this.animatedY.interpolate({
      inputRange: [0, size.height / 2, size.height / 2 + 1, size.height],
      outputRange: [COLORS.WHITE, COLORS.WHITE, color, color],
      extrapolate: 'clamp',
    });
    const translateY = this.animatedY.interpolate({
      inputRange: [0, size.height / 2, size.height / 2 + 1, size.height],
      outputRange: [bottomPosition, bottomPosition, topPosition, topPosition],
      extrapolate: 'clamp',
    });

    const style = StyleSheet.flatten([
      styles.text,
      {
        color: animatedColor,
        transform: [{ translateY }],
      },
    ]);

    return (
      <Value style={style} pointerEvents='none' />
    );
  }

  render() {
    const { color, size } = this.props;

    const style = StyleSheet.flatten([
      styles.wrapper,
      {
        transform: [{ scale: this.animatedScale }],
        backgroundColor: Converter.rgbWithOpacity(color, .11),
        height: size.height,
        width: size.width,
      },
    ]);

    console.log('okk')

    return (
      <Animated.View {...this.panResponder.panHandlers} style={style}>
        {this.renderLineIndicator()}
        {this.renderIndicator()}
        {/* {this.renderText()} */}
      </Animated.View>
    );
  }

};

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    fontSize: 25,
    lineHeight: 30,
    width: '50%',
    height: TEXT_HEIGHT,
  },
  lineIndicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 20,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  lineIndicatorText: {
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    fontSize: 17,
    lineHeight: 23,
    width: '50%',
  },
});

export default RangeInput;
