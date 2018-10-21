// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Flag extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M12.0511 1.29215C10.5025 0.569572 8.30086 0.513039 6.69697 1.15448C5.07648 1.80267 3.53004 1.47892 2.03453 1.1657C1.65504 1.08616 1.26595 1.00479 0.878906 0.940247V0H0V15H0.878906V8.86345C1.1919 8.91895 1.51096 8.98544 1.84204 9.05468C2.72587 9.23939 3.67653 9.43817 4.67537 9.43817C5.4332 9.43817 6.21883 9.32362 7.02335 9.00181C8.39699 8.45238 10.3552 8.50193 11.6794 9.1198L12.3047 9.41162V1.41048L12.0511 1.29215Z" fill={color}/></Svg>
    );
  }
}

export default Flag;
