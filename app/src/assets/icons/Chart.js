// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class Chart extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M15 14.5312C15 14.7904 14.7904 15 14.5312 15H0.46875C0.209648 15 0 14.7904 0 14.5312V0.46875C0 0.209648 0.209648 0 0.46875 0C0.727852 0 0.9375 0.209648 0.9375 0.46875V2.8125H1.40625C1.66535 2.8125 1.875 3.02215 1.875 3.28125C1.875 3.54035 1.66535 3.75 1.40625 3.75H0.9375V5.625H1.40625C1.66535 5.625 1.875 5.83465 1.875 6.09375C1.875 6.35285 1.66535 6.5625 1.40625 6.5625H0.9375V8.4375H1.40625C1.66535 8.4375 1.875 8.64715 1.875 8.90625C1.875 9.16535 1.66535 9.375 1.40625 9.375H0.9375V11.25H1.40625C1.66535 11.25 1.875 11.4596 1.875 11.7188C1.875 11.9779 1.66535 12.1875 1.40625 12.1875H0.9375V14.0625H14.5312C14.7904 14.0625 15 14.2721 15 14.5312ZM3.75 13.125C4.26773 13.125 4.6875 12.7057 4.6875 12.1875V9.375C4.6875 8.8568 4.26773 8.4375 3.75 8.4375C3.23227 8.4375 2.8125 8.8568 2.8125 9.375V12.1875C2.8125 12.7057 3.23227 13.125 3.75 13.125ZM6.5625 13.125C7.08023 13.125 7.5 12.7057 7.5 12.1875V6.5625C7.5 6.0443 7.08023 5.625 6.5625 5.625C6.04477 5.625 5.625 6.04433 5.625 6.5625V12.1875C5.625 12.7057 6.04477 13.125 6.5625 13.125ZM9.375 13.125C9.8932 13.125 10.3125 12.7057 10.3125 12.1875V4.6875C10.3125 4.1693 9.8932 3.75 9.375 3.75C8.8568 3.75 8.4375 4.16933 8.4375 4.6875V12.1875C8.4375 12.7057 8.8568 13.125 9.375 13.125ZM12.1875 13.125C12.7057 13.125 13.125 12.7057 13.125 12.1875V2.8125C13.125 2.2943 12.7057 1.875 12.1875 1.875C11.6693 1.875 11.25 2.29433 11.25 2.8125V12.1875C11.25 12.7057 11.6693 13.125 12.1875 13.125Z" fill={color}/></Svg>
    );
  }
}

export default Chart;
