//// @flow

import React from 'react';
import { View } from 'react-native';
import { pure } from 'recompose';
import { SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

const PADDING = 20;

type Props = {
  children: React$Element<any>,
};

const Body = ({ children }: Props) => (
  <View style={styles.wrapper}>
    {children}
  </View>
);

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default pure(Body);
