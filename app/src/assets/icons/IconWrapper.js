// @flow

import React from 'react';
import { SIZES, COLORS } from '@/constants';

type Props = {
  size?: number,
  color?: number,
};

class IconWrapper extends React.Component<Props> {
  static defaultProps = {
    size: SIZES.DEFAULT_ICON_SIZE,
    color: COLORS.WHITE,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { color } = this.props;

    return (nextProps.color !== color);
  }
}

export default IconWrapper;
