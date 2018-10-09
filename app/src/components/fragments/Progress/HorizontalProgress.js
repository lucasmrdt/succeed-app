import React from 'react';
import { View, Text } from 'react-native';
import { onlyUpdateForKeys } from 'recompose';
import { createStyleSheet } from '@/utils';
import * as Constants from '@/constants';
import ProgressBar from './ProgressBar';

type Props = {
  progress: number,
  color?: string,
  text?: string,
  size?: 's' | 'm' | 'xl' | {
    height?: number,
    width?: number,
  },
};

const HorizontalProgress = (props: Props) => {
  const { progress, ...others } = props;

  return (
    <ProgressBar
      animateAtMount
      animatedProgress={progress}
      {...others}
    />
  );
}

// Never update!
const OptimizedHorizontalProgress: React.ComponentType<Props> = (
  onlyUpdateForKeys(['progress', 'text'])(HorizontalProgress)
);
export default OptimizedHorizontalProgress;
