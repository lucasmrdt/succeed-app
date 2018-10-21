// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class RightArrow extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.865791 7.07008L17.0442 7.07008L13.1838 10.9307C12.8456 11.2687 12.8456 11.817 13.1838 12.155C13.522 12.4932 14.0703 12.4932 14.408 12.155L19.7464 6.81654C20.0845 6.47854 20.0845 5.93019 19.7464 5.5923L14.408 0.253602C14.239 0.0844536 14.0174 4.76837e-06 13.7959 4.76837e-06C13.5744 4.76837e-06 13.3529 0.0844536 13.1838 0.253602C12.8456 0.591599 12.8456 1.13989 13.1838 1.47779L17.0442 5.33865L0.865791 5.33865C0.387695 5.33865 0 5.7263 0 6.20439C0 6.68249 0.387646 7.07008 0.865791 7.07008Z" fill={color}/></Svg>
    );
  }
}

export default RightArrow;
