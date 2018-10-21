// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Circle } = Svg;

class Dot extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><Circle cx="3.5" cy="3.5" r="3.5" fill={color}/></Svg>
    );
  }
}

export default Dot;
