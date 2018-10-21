// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Profile extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M19.4118 8.82353C19.4118 6.38647 18.4235 4.18059 16.8282 2.58529C15.2312 0.988235 13.0253 0 10.5882 0C8.15118 0 5.9453 0.988235 4.34824 2.58529C2.75295 4.18059 1.76471 6.38647 1.76471 8.82353C1.76471 11.2606 2.75295 13.4665 4.34824 15.0618C5.9453 16.6588 8.15118 17.6471 10.5882 17.6471C13.0253 17.6471 15.2312 16.6588 16.8282 15.0618C18.4235 13.4665 19.4118 11.2606 19.4118 8.82353Z" fill={color} fill-opacity="1"/><Path d="M0 26.4706C0 28.2353 3.97059 30 10.5882 30C16.7965 30 21.1765 28.2353 21.1765 26.4706C21.1765 22.9412 17.0224 19.4117 10.5882 19.4117C3.97059 19.4117 0 22.9412 0 26.4706Z" fill={color} fill-opacity="1"/></Svg>
    );
  }
}

export default Profile;
