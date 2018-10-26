// @flow

import React from 'react';
import { Touchable } from '../Buttons';

type Props = {
  onPress: (index: number) => void,
  index: number,
  children: React$Element<any>,
};

class OverlayItem extends React.PureComponent<Props> {

  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);
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
