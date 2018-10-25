// @flow

import React from 'react';
import { Animated, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Touchable, ButtonWithIcon } from '../Buttons';
import OverlayItem from './OverlayItem';
import OverlayBackground from './OverlayBackground';
import { DownArrow } from '@/assets/icons';
import { createStyleSheet } from '@/utils';
import { ANIMATIONS, COLORS, SIZES } from '@/constants';

import {
  type RNTypes,
  type DataTypes,
} from '@/types';

const TEXT_BUTTON_PADDING = 20;
const ICON_SIZE = SIZES.ICON_SIZE_S;
const WRAPPER_PADDING_TOP = 100;
const ANIMATION_OPTIONS = {
  easing: ANIMATIONS.EASING_EXP,
  duration: ANIMATIONS.VERY_QUICK_DURATION,
  useNativeDriver: true,
};

type Props = {
  onSelectItem: (index: any) => void,
  buttonText: string,
  buttonIcon: DataTypes.IconTypes,
  height?: number,
};

type State = {
  status: 'open' | 'close' | 'moving',
  color: string,
};

class OverlayWrapper extends React.PureComponent<Props, State> {

  animation = new Animated.Value(0)

  state: State = {
    status: 'close',
    color: COLORS.WHITE,
  }

  static defaultProps = {
    height: SIZES.HEIGHT / 2,
  }

  componentDidMount() {
    this.toggle();
  }

  switchColor() {
    const { color } = this.state;
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

  onPressItem = (id) => {
    const { onSelectItem } = this.props;
    onSelectItem(id);
    this.toggle();
  }

  renderOverlayChilds() {
    const { children } = this.props;

    return (React.Children.map(children, (child, index) => (
      <OverlayItem id={index} onPress={this.onPressItem}>
        {child}
      </OverlayItem>
    )));
  }

  renderOverlay() {
    const { height } = this.props;
    const translateY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0],
    });

    const style: Array<RNTypes.StylesheetType> = [
      styles.overlay,
      {
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

  renderArrow = (color) => {
    const rotate = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const style: RNTypes.StylesheetType = {
      transform: [ {rotate} ],
    };

    return (
      <Animated.View style={style}>
        <DownArrow color={color} size={ICON_SIZE} />
      </Animated.View>
    );
  }

  renderButton() {
    const { color } = this.state;
    const { buttonIcon, buttonText } = this.props;

    return (
      <ButtonWithIcon
        leftIcon={buttonIcon}
        rightIcon={this.renderArrow}
        iconSize={ICON_SIZE}
        onPress={this.toggle}
        style={styles.button}
        color={color}
        textStyle={styles.textButton}
        fontSize='xl'
        justify='space-between'
        light
        dynamicWidth
      >
        {buttonText.toUpperCase()}
      </ButtonWithIcon>
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
    backgroundColor: COLORS.WHITE,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  textButton: {
    paddingLeft: TEXT_BUTTON_PADDING,
    paddingRight: TEXT_BUTTON_PADDING,
  },
  button: {
    zIndex: 3,
    position: 'absolute',
    top: 30,
    left: 10,
    borderWidth: 0,
  },
});

export default OverlayWrapper;
