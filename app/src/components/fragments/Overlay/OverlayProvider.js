// @flow

import React from 'react';
import { Animated } from 'react-native';
import { Context } from './OverlayContext';
import { ANIMATIONS } from '@/constants';

import { type ContextType } from './OverlayContext';

const ANIMATION_OPTIONS = {
  easing: ANIMATIONS.EASING_EXP,
  duration: ANIMATIONS.VERY_QUICK_DURATION,
  useNativeDriver: true,
};

type State = ContextType;

class OverlayProvider extends React.PureComponent<void, State> {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      status: 'close',
      toggle: this.toggle,
      light: true,
    };
  }

  open = () => {
    const { toggle, progress } = this.state;

    Animated.timing(progress, {
      toValue: 1,
      ...ANIMATION_OPTIONS,
    }).start(() => {
      toggle();
      this.setState({ status: 'open' });
    });
  };

  close = () => {
    const { toggle, progress } = this.state;

    Animated.timing(progress, {
      toValue: 0,
      ...ANIMATION_OPTIONS,
    }).start(() => {
      toggle();
      this.setState({ status: 'close' });
    });
  };

  toggle = () => {
    const { status } = this.state;

    if (status === 'moving') {
      // Prevent spamming click.
      return;
    }

    this.setState((prevState: State) => ({
      status: 'moving',
      light: !prevState.light,
    }));

    if (status === 'open') {
      this.close();
    } else {
      this.open();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }

}

export default OverlayProvider;
