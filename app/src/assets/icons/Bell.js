// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Bell extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M24.6875 23C24.6875 23 22.4375 19.5 22.4375 15V10C22.4375 4.5 17.9375 0 12.4375 0C6.9375 0 2.4375 4.5 2.4375 10V15C2.4375 19.5 0.1875 23 0.1875 23C-0.0625 23.375 -0.0625 23.875 0.1875 24.25C0.3125 24.75 0.6875 25 1.1875 25H23.6875C24.1875 25 24.5625 24.75 24.8125 24.375C25.0625 23.875 24.9375 23.5 24.6875 23Z" fill={color} fill-opacity="1"/><Path d="M8.1875 27.5C9.0625 29 10.6875 30 12.4375 30C14.1875 30 15.8125 29 16.6875 27.5H8.1875Z" fill={color} fill-opacity="1"/></Svg>
    );
  }
}

export default Bell;
