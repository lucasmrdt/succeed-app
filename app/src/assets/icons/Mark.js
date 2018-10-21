// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Mark extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M5.00001 2.5C3.62001 2.5 2.5 3.62001 2.5 5.00001C2.5 6.38001 3.62001 7.5 5.00001 7.5C6.38001 7.5 7.50002 6.37999 7.50002 4.99999C7.50002 3.61999 6.38001 2.5 5.00001 2.5Z" fill={color}/><Path d="M5 0C2.23751 0 0 2.23751 0 5C0 7.76249 2.23751 10 5 10C7.76249 10 10 7.76251 10 5C10 2.23749 7.76251 0 5 0ZM5 9.00001C2.79 9.00001 0.999986 7.21002 0.999986 5C0.999986 2.78998 2.79 1.00001 5 1.00001C7.21 1.00001 9.00001 2.79 9.00001 5C9.00001 7.21 7.21002 9.00001 5 9.00001Z" fill={color}/></Svg>
    );
  }
}

export default Mark;
