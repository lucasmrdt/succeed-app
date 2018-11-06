// @flow

import React from 'react';
import { Animated } from 'react-native';
import { StylisedText } from '../Text';
import Context from './SliderContext';

import { type StateType as ContextType } from './SliderContext';


type Props = ContextType & {
  color: string,
  size: string,
};

@Context.withContext('value')
class SliderValue extends React.PureComponent<Props> {
  render() {
    const { value, color, size, ...props } = this.props;

    return (
      <Animated.View {...props}>
        <StylisedText
          color={color}
          size={size}
        >
          {value}
        </StylisedText>
      </Animated.View>
    );
  }
}

export default SliderValue;
