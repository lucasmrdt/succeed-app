// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Add extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M20.1797 9.67969H11.3203V0.820312C11.3203 0.367254 10.9531 0 10.5 0C10.0469 0 9.67969 0.367254 9.67969 0.820312V9.67969H0.820312C0.367254 9.67969 0 10.0469 0 10.5C0 10.9531 0.367254 11.3203 0.820312 11.3203H9.67969V20.1797C9.67969 20.6327 10.0469 21 10.5 21C10.9531 21 11.3203 20.6327 11.3203 20.1797V11.3203H20.1797C20.6327 11.3203 21 10.9531 21 10.5C21 10.0469 20.6327 9.67969 20.1797 9.67969Z" fill={color}/></Svg>
    );
  }
}

export default Add;
