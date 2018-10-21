// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Clock extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M9.99983 0C4.47714 0 0 4.47727 0 9.99983C0 15.5224 4.47714 20 9.99983 20C15.5225 20 20 15.5224 20 9.99983C20 4.47727 15.5225 0 9.99983 0ZM14.323 11.9018H10.0835C10.0692 11.9018 10.0558 11.8983 10.0416 11.8978C10.0274 11.8985 10.0142 11.9018 9.99977 11.9018C9.61783 11.9018 9.30816 11.5921 9.30816 11.2102V4.15C9.30816 3.76806 9.61783 3.45839 9.99977 3.45839C10.3817 3.45839 10.6914 3.76806 10.6914 4.15V10.5186H14.3228C14.7047 10.5186 15.0144 10.8282 15.0144 11.2102C15.0144 11.5921 14.705 11.9018 14.323 11.9018Z" fill={color}/></Svg>
    );
  }
}

export default Clock;
