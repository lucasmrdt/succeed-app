// @flow

import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { Touchable } from '../Buttons';
import { Context } from './OverlayContext';
import { withContext } from '@/hoc';
import { createStyleSheet } from '@/utils';
import { COLORS, SIZES } from '@/constants';

import { type OverlayContextType } from '@/types/contextType';
import { type StylesheetType } from '@/types/rnTypes';

const BACKGROUND_OPACITY = .3;
const WRAPPER_PADDING_TOP = 100;

type Props = OverlayContextType & {
  onSelectItem: (index: number) => void,
  children: React.ComponentType<any>,
  backgroundColor: string,
  height: number,
};

class Overlay extends React.PureComponent<Props, State> {

  // TODO: Use this in next update of react >16.6.0
  // static contextType = Context;

  static defaultProps = {
    backgroundColor: COLORS.WHITE,
    height: SIZES.HEIGHT / 2,
  };

  onPressItem = (index: number) => {
    const { onSelectItem, toggle } = this.props;

    toggle();
    onSelectItem(index);
  }

  renderOverlayChilds() {
    const { children } = this.props;

    return (React.Children.map(children, (child, index) => (
      <Touchable onPress={this.onPressItem} id={`${index}`}>
        {child}
      </Touchable>
    )));
  }

  renderOverlayWrapper() {
    const { height, backgroundColor, animationProgress } = this.props;
    const translateY = animationProgress.interpolate({
      inputRange: [  0,      1],
      outputRange: [-height, 0],
    });

    const style: Array<StylesheetType> = [
      styles.overlay,
      {
        transform: [{ translateY }],
        backgroundColor,
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
    const { context } = this.props;

    if (context.status === 'close') {
      return null;
    }

    const opacity = context.progress.interpolate({
      inputRange: [ 0, 1],
      outputRange: [0, BACKGROUND_OPACITY],
    });

    const style: Array<StylesheetType> = [
      styles.overlayBackground,
      { opacity },
    ];

    return (
      <TouchableWithoutFeedback onPressIn={context.toggle}>
        <Animated.View style={style}/>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderOverlayWrapper()}
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
  overlayBackground: {
    zIndex: 1,
    backgroundColor: COLORS.BLACK,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

export type OverlayProps = Props;
export default Overlay;
