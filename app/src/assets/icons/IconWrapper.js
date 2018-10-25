// @flow

import React from 'react';
import { DEFAULT_ICON_SIZE } from '@/constants/sizes';
import { WHITE } from '@/constants/colors';

import { type DataTypes } from '@/types';

type Props = DataTypes.IconPropsType;

class IconWrapper extends React.Component<Props> {

  static defaultProps = {
    size: DEFAULT_ICON_SIZE,
    color: WHITE,
  }

  shouldComponentUpdate(nextProps: Props) {
    const { color } = this.props;
    return (nextProps.color !== color);
  }

}

export default IconWrapper;
