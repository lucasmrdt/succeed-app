// @flow

import React from 'react';
import { Touchable } from '../Buttons';
import { createStyleSheet } from '@/utils';
import { STYLES } from '@/constants';

import { type RNTypes } from '@/types';

type Props = {
  onPress: (id: string) => void,
  id: string,
  childCount: number,
};

class OverlayItem extends React.PureComponent<Props> {
  static defaultProps = {
    onPressOut: null,
  }

  onPress = () => {
    const { id, onPress } = this.props;
    onPress(id);
  }

  render() {
    const { children } = this.props;

    return (
      <Touchable onPress={this.onPress}>
        {children}
      </Touchable>
    );
  }
}

export default OverlayItem;
