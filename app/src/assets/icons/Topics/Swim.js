// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from '../IconWrapper';
const { Path } = Svg;

class Swim extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 31 20" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M3.91456 4.20103L11.0447 5.11767C11.2936 5.7495 12.5474 8.85954 12.7831 9.41607C12.7831 9.41607 12.7831 9.41607 12.7798 9.41607C10.7141 10.4375 8.64837 11.4556 6.58265 12.477C7.29959 12.3461 8.02636 12.2806 8.7564 12.2806C9.71233 12.2806 10.6486 12.3952 11.5423 12.6211C13.3462 13.0794 14.9765 13.8127 16.5511 14.5231C17.9556 15.1549 19.2847 15.754 20.6106 16.0978C20.7972 16.1469 20.9772 16.1894 21.1573 16.2254C19.5859 13.0074 15.3595 4.33525 14.5247 2.42666C14.1319 1.52639 13.5917 1.19247 12.8257 1.09426L4.45148 0.0172012C3.29586 -0.130117 2.23844 0.685041 2.08785 1.84067C1.94378 2.99629 2.75893 4.05371 3.91456 4.20103Z" fill={color}/><Path d="M0.545875 19.2405C0.77831 19.4075 1.04348 19.486 1.30865 19.486C1.36758 19.486 1.42323 19.4827 1.47889 19.4729C1.8259 19.4271 2.15328 19.2438 2.37262 18.9393C3.22051 17.7575 4.53328 16.8278 6.06211 16.317C6.93946 16.0257 7.85611 15.8784 8.75638 15.8784C12.0203 15.8784 14.8193 17.8295 17.7656 18.9524C19.3436 19.5547 20.9903 20 22.781 20C23.534 20 24.3131 19.9214 25.1217 19.7414C27.0238 19.3223 28.6541 18.4188 29.8326 17.1518C30.1141 16.8474 30.3695 16.5265 30.5954 16.1828C30.9948 15.5804 30.8278 14.7686 30.2255 14.3692C30.0028 14.2218 29.754 14.1531 29.5052 14.1531C29.0797 14.1531 28.6639 14.3593 28.4118 14.7391C28.3103 14.8929 28.199 15.0402 28.0779 15.1843C27.2595 16.1599 26.0318 16.8605 24.5586 17.1846C23.2 17.4825 21.7007 17.3941 20.3617 17.0471C18.954 16.6804 17.5921 16.0683 16.1452 15.4168C14.6065 14.726 13.0187 14.0091 11.2968 13.5704C10.4784 13.3609 9.62065 13.2594 8.75311 13.2594C7.57129 13.2594 6.36984 13.4525 5.22731 13.8323C4.22882 14.1662 3.30235 14.6311 2.47083 15.2171C1.59347 15.8358 0.843784 16.5724 0.241419 17.4105C0.202134 17.4661 0.169397 17.5218 0.139933 17.5807C-0.144881 18.1471 0.0122577 18.8575 0.545875 19.2405Z" fill={color}/><Path d="M24.2542 13.1645C26.8053 13.1645 28.8734 11.0964 28.8734 8.54525C28.8734 5.99413 26.8053 3.92603 24.2542 3.92603C21.703 3.92603 19.6349 5.99413 19.6349 8.54525C19.6349 11.0964 21.703 13.1645 24.2542 13.1645Z" fill={color}/></Svg>
    );
  }
}

export default Swim;