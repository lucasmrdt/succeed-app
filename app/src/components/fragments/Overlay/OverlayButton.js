// @flow

import React from 'react';
import { Animated, Platform } from 'react-native';
import { StylisedButton } from '../Buttons';
import { DownArrow } from '@/assets/icons';
import { createStyleSheet } from '@/utils';
import { SIZES, STYLES, COLORS } from '@/constants';


import { type OverlayContextType } from '@/types/contextType';
import { type StylesheetType } from '@/types/rnTypes';
import { type IconTypes } from '@/types/dataTypes';

const TEXT_BUTTON_PADDING = 20;
const ICON_SIZE = SIZES.ICON_SIZE_S;

type Props = OverlayContextType & {
  color: string,
  text: string,
  icon: IconTypes,
};

class OverlayButton extends React.PureComponent<Props> {

  // TODO: Use this in next update of react >16.6.0
  // static contextType = Context;

  static defaultProps = {
    color: COLORS.PURPLE,
  }

  renderArrow = (color: string) => {
    const { animationProgress } = this.props;
    const rotate = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const style: StylesheetType = {
      transform: [ {rotate} ],
    };

    return (
      <Animated.View style={style}>
        <DownArrow color={color} size={ICON_SIZE} />
      </Animated.View>
    );
  }

  render() {
    const {
      icon,
      text,
      color,
      toggle,
      ...props
    } = this.props;

    return (
      <StylisedButton
        {...props}
        color={color}
        onPress={toggle}
        leftIcon={icon}
        rightIcon={this.renderArrow}
        iconSize={ICON_SIZE}
        style={styles.button}
        textStyle={styles.textButton}
        fontSize='xl'
        justify='space-between'
        fontType='light'
        light
        dynamicSize
      >
        {text.toUpperCase()}
      </StylisedButton>
    );
  }

}

const styles = createStyleSheet({
  textButton: {
    paddingLeft: TEXT_BUTTON_PADDING,
    paddingRight: TEXT_BUTTON_PADDING,
    ...Platform.select({
      ios: {
        // Fix vertical align with text on ios.
        // TODO: Fix better solution.
        transform: [{ translateY: -4 }],
      },
    }),
  },
  button: {
    // ...STYLES.HEADER_LEFT,
    ...Platform.select({
      ios: {
        // Fix the height of the button on ios
        // because, lineHeight of text increase
        // the height of the parrent width, and so
        // position of the parent.
        height: 25,
      },
    }),
    padding: 0,
    zIndex: 3,
    borderWidth: 0,
  },
});

export default OverlayButton;
