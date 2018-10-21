// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Avatar extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M15 0C6.72871 0 0 6.72919 0 15C0 23.2708 6.72871 30 15 30C23.2713 30 30 23.2708 30 15C30 6.72919 23.2713 0 15 0ZM9.19355 13.0645C9.19355 9.86274 11.7982 7.25806 15 7.25806C18.2018 7.25806 20.8065 9.86274 20.8065 13.0645V14.5161C20.8065 17.7179 18.2018 20.3226 15 20.3226C11.7982 20.3226 9.19355 17.7179 9.19355 14.5161V13.0645ZM15 29.0323C11.7576 29.0323 8.77113 27.9237 6.39242 26.07C7.78161 23.7048 10.2871 22.2581 13.0645 22.2581H16.9355C19.7095 22.2581 22.215 23.7048 23.6071 26.0705C21.2284 27.9242 18.2419 29.0323 15 29.0323Z" fill={color}/></Svg>
    );
  }
}

export default Avatar;
