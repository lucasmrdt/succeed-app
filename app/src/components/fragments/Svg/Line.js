// @flow

import React from 'react';
import { Animated } from 'react-native';
import { pure } from 'recompose';
import { Svg } from 'expo';
const { Line } = Svg;

const LINE_HEIGHT = 5;

type Props = {
  color: Animated.Value,
  width: number,
};

const CustomLine = (props: Props) => (
  <Svg width={props.width} height={LINE_HEIGHT}>
    <Line
      strokeOpacity={1}
      strokeWidth={2}
      stroke={props.color}
      x1={0}
      x2={props.width}
      y1={3}
      y2={3}
    />
  </Svg>
);

export default pure(CustomLine);
