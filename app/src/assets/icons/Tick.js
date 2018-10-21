// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Tick extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M18.7845 0.279197C18.4123 -0.0930656 17.8088 -0.0930656 17.4365 0.279197L6.01676 11.699L1.62721 7.30947C1.25498 6.93721 0.651496 6.93725 0.279197 7.30947C-0.0930656 7.6817 -0.0930656 8.28518 0.279197 8.65745L5.34275 13.7209C5.71487 14.0932 6.3188 14.0929 6.69076 13.7209L18.7845 1.6272C19.1567 1.25498 19.1567 0.651459 18.7845 0.279197Z" fill={color}/></Svg>
    );
  }
}

export default Tick;
