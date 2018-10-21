// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class DownArrow extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M17.4679 0.210834C17.1882 -0.0702779 16.7344 -0.0702779 16.4547 0.210834L9.11882 8.2603L1.78214 0.210834C1.50246 -0.0702779 1.04865 -0.0702779 0.768968 0.210834C0.489283 0.491945 0.489283 0.947878 0.768968 1.22896L8.57584 9.79492C8.72496 9.94476 8.9233 10.009 9.1181 9.999C9.31356 10.009 9.51123 9.94476 9.66035 9.79492L17.4679 1.22821C17.7476 0.947151 17.7476 0.491945 17.4679 0.210834Z" fill={color}/></Svg>
    );
  }
}

export default DownArrow;
