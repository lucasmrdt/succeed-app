// @flow

import React from 'react';
import Button, { type ButtonProps } from './Button';
import { COLORS } from '@/constants';
import { getIcon } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';

const SIZE = 50;

type Props = ButtonProps & {
  onPress: (id: string) => void,
  icon: string | React$Element<any>,
  color?: string,
  style?: StylesheetType,
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

  renderIcon() {
    const { icon, color } = this.props;
    const Icon = getIcon(icon);

    if (typeof icon === 'object') {
      return icon;
    }
    return (Icon && <Icon color={color} />);
  }

  render() {
    const { isSelected, color, ...props } = this.props;

    return (
      <Button
        size={{ height: SIZE, width: SIZE }}
        rounded='little'
        light={isSelected}
        color={color}
        {...props}
      >
        {this.renderIcon()}
      </Button>
    );
  }
}

export default ButtonIcon;
