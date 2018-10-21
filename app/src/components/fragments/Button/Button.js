// @flow

import React from 'react';
import AnimatedButton from './AnimatedButton';
import StaticButton from './StaticButton';
import { SIZES } from '@/constants';

type Props = {
  onPress: (id: string) => void,
  children: React.Component<*, *>,
  size?: { height: number, width: number },
  optimized?: bool,
  rounded?: 'fully' | 'little',
  light?: bool,
  id?: string,
  style?: RNTypes.StylesheetType,
};

class Button extends React.PureComponent<Props> {
  static defaultProps = {
    ...StaticButton.defaultProps,
    ...AnimatedButton.defaultProps,
    size:{
      width: SIZES.DEFAULT_BUTTON_WIDTH,
      height: SIZES.DEFAULT_BUTTON_HEIGHT,
    },
    optimized: false,
  };

  getPropsSize() {
    const { optimized, size } = this.props;

    if (optimized) {
      return { size };
    }
    return {
      animatedWidth: size.width,
      animatedHeight: size.height,
    };
  }

  render() {
    const { optimized, ...props } = this.props;
    const propsSize = this.getPropsSize();
    const Button = optimized ? StaticButton : AnimatedButton;

    console.log(`Render ${this.constructor.name}.`);

    return (
      <Button
        {...props}
        {...propsSize}
      />
    );
  }
}

export default Button;
