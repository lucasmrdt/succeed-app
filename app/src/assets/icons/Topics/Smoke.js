// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from '../IconWrapper';
const { Path } = Svg;

class Smoke extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      <Svg width={size} height={size} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M19.0906 13.4203H0.539832C0.242083 13.4203 0 13.662 0 13.9602V18.6043C0 18.9027 0.242 19.1444 0.539832 19.1444H19.0906C19.3883 19.1444 19.6306 18.9027 19.6306 18.6043V13.9602C19.6303 13.6621 19.3883 13.4203 19.0906 13.4203Z" fill={color}/><Path d="M26.2674 13.4203H22.1687C21.8702 13.4203 21.6284 13.662 21.6284 13.9602V18.6043C21.6284 18.9027 21.8702 19.1444 22.1687 19.1444H26.2674C26.5652 19.1444 26.8073 18.9027 26.8073 18.6043V13.9602C26.8073 13.6621 26.5652 13.4203 26.2674 13.4203Z" fill={color}/><Path d="M22.0312 10.9866C22.1685 11.0699 22.32 11.1096 22.4697 11.1096C22.7557 11.1096 23.0346 10.9647 23.194 10.7022L25.2517 7.31178C25.4638 6.96244 25.3958 6.51153 25.0904 6.24003L22.6535 4.07336L24.3451 1.2857C24.5876 0.886202 24.4605 0.365536 24.061 0.123037C23.6613 -0.119546 23.1409 0.00787042 22.8984 0.407453L20.8406 3.79811C20.6285 4.14745 20.6965 4.59836 21.002 4.86978L23.4386 7.03636L21.7469 9.82377C21.5042 10.2234 21.6316 10.7441 22.0312 10.9866Z" fill={color}/><Path d="M29.716 6.23997L27.2791 4.0733L28.9712 1.28564C29.2134 0.886141 29.0861 0.365475 28.6865 0.122976C28.287 -0.119607 27.7665 0.00780939 27.5238 0.407392L25.466 3.79814C25.254 4.14747 25.3219 4.59839 25.6275 4.8698L28.0641 7.03638L26.3722 9.82379C26.1297 10.2235 26.2571 10.744 26.6567 10.9865C26.7939 11.0699 26.9455 11.1095 27.095 11.1095C27.3812 11.1095 27.6601 10.9646 27.8193 10.7021L29.8772 7.31171C30.0891 6.96246 30.0213 6.51163 29.716 6.23997Z" fill={color}/></Svg>
    );
  }
}

export default Smoke;