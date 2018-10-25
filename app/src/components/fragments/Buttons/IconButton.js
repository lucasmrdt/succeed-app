// @flow

import React from 'react';
import Button, { type ButtonProps } from './Button';
import * as Icons from '@/assets/icons';
import { COLORS } from '@/constants';
import { getIcon } from '@/utils';

import { type RNTypes } from '@/types';

const SIZE = 50;

type Props = ButtonProps & {
  onPress: (id: string) => void,
  icon: string | React$Element<any>,
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

  render() {
    const { isSelected, icon, color, ...props } = this.props;
    const Icon = getIcon(icon);

    return (
      <Button
        size={{ height: SIZE, width: SIZE }}
        rounded='little'
        light={isSelected}
        color={color}
        {...props}
      >
        {/* $FlowFixMe don't understand... */}
        {Icon && <Icon color={isSelected ? color : COLORS.WHITE} />}
      </Button>
    );
  }
}

export default ButtonIcon;
