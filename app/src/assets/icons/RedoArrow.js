// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class RedoArrow extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M9.35639 4.85102V0L16.8564 7.5L9.35639 15V10.0425C0.630799 9.83777 1.00506 15.9759 3.22631 20C-2.25635 14.0739 -1.09205 4.57871 9.35639 4.85102Z" fill={color}/></Svg>
    );
  }
}

export default RedoArrow;
