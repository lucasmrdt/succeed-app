// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from '../IconWrapper';
const { Path } = Svg;

class Scales extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M24.375 0H5.625C2.51769 0 0 2.51769 0 5.625V24.375C0 27.4823 2.51769 30 5.625 30H24.375C27.4823 30 30 27.4823 30 24.375V5.625C30 2.51769 27.4823 0 24.375 0ZM20.7692 13.8462H9.23077L4.61538 8.07692C4.61538 8.07692 8.07692 3.46154 15 3.46154C21.9231 3.46154 25.3846 8.07692 25.3846 8.07692L20.7692 13.8462Z" fill={color}/><Path d="M18.015 12.6923L19.5946 5.78076L15.0231 12.6923H18.015Z" fill={color}/></Svg>
    );
  }
}

export default Scales;
