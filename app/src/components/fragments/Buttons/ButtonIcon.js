// @flow

import React from 'react';
import Button from './Button';
import * as Icons from '@/assets/icons';
import { COLORS } from '@/constants';

import { type RNTypes } from '@/types';

const SIZE = 50;

type Props = {
  onPress: (id: string) => void,
  icon: string | React.Component,
  color?: string,
  style?: RNTypes.StylesheetType,
  isSelected?: bool,
  id?: string,
};

class ButtonIcon extends React.Component<Props> {
  static defaultProps = {
    isSelected: false,
    color: COLORS.GREEN,
    style: null,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { isSelected } = this.props;
    return (isSelected !== nextProps.isSelected);
  }

  getIcon() {
    const { icon } = this.props;

    if (typeof icon === 'string') {
      return Icons[icon] || Icons.Rocket;
    }
    return icon;
  }

  render() {
    const { isSelected, ...props } = this.props;
    const Icon = this.getIcon();

    return (
      <Button
        size={{ height: SIZE, width: SIZE }}
        rounded='little'
        light={isSelected}
        {...props}
      >
        <Icon color={isSelected ? color : COLORS.WHITE} />
      </Button>
    );
  }
}

export default ButtonIcon;
