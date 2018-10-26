// @flow

import React from 'react';
import { Animated, Platform } from 'react-native';
import { ButtonWithIcon } from '../Buttons';
import { DownArrow } from '@/assets/icons';
import { createStyleSheet } from '@/utils';
import { SIZES, STYLES } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';
import { type IconTypes } from '@/types/dataTypes';

const TEXT_BUTTON_PADDING = 20;
const ICON_SIZE = SIZES.ICON_SIZE_S;

type Props = {
  color: string,
  buttonText: string,
  buttonIcon: IconTypes,
  progress: Animated.Value,
  onPress: () => void,
};

class OverlayButton extends React.PureComponent<Props> {

  renderArrow = (color: string) => {
    const { progress } = this.props;
    const rotate = progress.interpolate({
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
    const { buttonIcon, buttonText, ...props } = this.props;

    return (
      <ButtonWithIcon
        {...props}
        leftIcon={buttonIcon}
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
        {buttonText.toUpperCase()}
      </ButtonWithIcon>
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
    ...STYLES.HEADER_LEFT,
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
