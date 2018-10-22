// @flow

import React from 'react';
import { Animated } from 'react-native';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Rocket extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M28.4664 29.9278C28.0934 24.8406 25.6751 21.6106 23.7123 19.7968C23.4862 19.5879 23.2614 19.3935 23.0398 19.2112C23.039 11.8988 20.7086 7.08746 18.7535 4.3389C16.6224 1.34281 14.5082 0.100915 14.4192 0.0496079C14.3045 -0.016536 14.1634 -0.016536 14.0488 0.0496079C13.9599 0.100915 11.8457 1.34294 9.71457 4.3389C7.75947 7.08746 5.42901 11.8987 5.42829 19.2112C5.20666 19.3934 4.98189 19.5879 4.75568 19.7968C2.79286 21.6107 0.374623 24.8408 0.00161603 29.9279C-0.0106062 30.0938 0.0469099 30.2576 0.160243 30.3794C0.273577 30.5014 0.432466 30.5706 0.598937 30.5706H8.12287C8.5513 31.3876 8.99607 32.0459 9.42902 32.4846C9.49856 32.5551 9.59346 32.5947 9.69242 32.5947H9.87608C10.1528 36.532 13.2932 39.5492 13.433 39.6812C13.6577 39.8938 13.9458 40 14.2339 40C14.522 40 14.8101 39.8938 15.0348 39.6812C15.1746 39.5491 18.3149 36.532 18.5918 32.5947H18.7756C18.8745 32.5947 18.9694 32.5551 19.039 32.4846C19.472 32.0459 19.9167 31.3876 20.3451 30.5706H27.869C28.0355 30.5706 28.1944 30.5012 28.3077 30.3794C28.4211 30.2575 28.4786 30.0939 28.4664 29.9278ZM14.2341 10.2496C16.0486 10.2496 17.5197 11.7205 17.5197 13.5352C17.5197 15.3498 16.0487 16.8208 14.2341 16.8208C12.4195 16.8208 10.9484 15.3497 10.9484 13.5352C10.9484 11.7206 12.4194 10.2496 14.2341 10.2496ZM14.2341 37.0808C13.4657 36.1099 12.3973 34.4565 12.2136 32.5948H16.2545C16.0707 34.4567 15.002 36.1103 14.2341 37.0808Z" fill={color} />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(Rocket);
