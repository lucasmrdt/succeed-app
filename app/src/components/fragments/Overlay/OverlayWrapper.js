// @flow

import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import OverlayItem from './OverlayItem';
import OverlayBackground from './OverlayBackground';
import OverlayButton from './OverlayButton';
import { createStyleSheet } from '@/utils';
import { ANIMATIONS, COLORS, SIZES } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';
import { type IconTypes } from '@/types/dataTypes';

const WRAPPER_PADDING_TOP = 100;
const ANIMATION_OPTIONS = {
  easing: ANIMATIONS.EASING_EXP,
  duration: ANIMATIONS.VERY_QUICK_DURATION,
  useNativeDriver: true,
};

type Props = {
  onSelectItem: (index: number) => void,
  buttonText: string,
  buttonIcon: IconTypes,
  children: React$Element<any>,
  light: bool,
  height: number,
};

type State = {
  status: 'open' | 'close' | 'moving',
  color: string,
};

class OverlayWrapper extends React.PureComponent<Props, State> {

  animation = new Animated.Value(0)
  state: State

  constructor(props: Props) {
    console.log(props)
    super(props);
    const { light } = props;
    this.state = {
      status: 'close',
      color: light ? COLORS.WHITE : COLORS.PURPLE,
    };
  }

  static defaultProps = {
    light: false,
    height: SIZES.HEIGHT / 2,
  }

  switchColor() {
    const { color } = this.state;
    const { light } = this.props;

    if (!light) return;

    if (color === COLORS.WHITE) {
      this.setState({ color: COLORS.PURPLE });
    } else {
      this.setState({ color: COLORS.WHITE });
    }
  }

  open = () => {
    Animated.timing(this.animation, {
      toValue: 1,
      ...ANIMATION_OPTIONS,
    }).start(() => this.setState({ status: 'open' }));
  }

  close = () => {
    Animated.timing(this.animation, {
      toValue: 0,
      ...ANIMATION_OPTIONS,
    }).start(() => this.setState({ status: 'close' }));
  }

  toggle = () => {
    const { status } = this.state;

    if (status === 'moving') {
      // Prevent spamming click.
      return;
    }

    this.setState({ status: 'moving' });
    this.switchColor();
    if (status === 'open') {
      this.close();
    } else {
      this.open();
    }
  }

  onPressItem = (index: number) => {
    const { onSelectItem } = this.props;
    onSelectItem(index);
    this.toggle();
  }

  renderOverlayChilds() {
    const { children } = this.props;

    return (React.Children.map(children, (child, index) => (
      <OverlayItem index={index} onPress={this.onPressItem}>
        {child}
      </OverlayItem>
    )));
  }

  renderOverlay() {
    const { height, light } = this.props;
    const translateY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0],
    });

    const style: Array<StylesheetType> = [
      styles.overlay,
      {
        backgroundColor: COLORS.WHITE,
        transform: [{ translateY }],
        height,
      },
    ];

    return (
      <TouchableWithoutFeedback onPressOut={this.toggle}>
        <Animated.View style={style}>
          {this.renderOverlayChilds()}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  renderOverlayBackground() {
    const { status } = this.state;

    return (
      <OverlayBackground
        onPressIn={this.toggle}
        overlayStatus={status}
        progress={this.animation}
      />
    );
  }

  renderButton() {
    const { color } = this.state;

    return (
      <OverlayButton
        {...this.props}
        color={color}
        onPress={this.toggle}
        progress={this.animation}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderButton()}
        {this.renderOverlay()}
        {this.renderOverlayBackground()}
      </React.Fragment>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    width: '100%',
    top: 0,
    left: 0,
  },
  overlay: {
    zIndex: 2,
    top: 0,
    paddingTop: WRAPPER_PADDING_TOP,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default OverlayWrapper;
