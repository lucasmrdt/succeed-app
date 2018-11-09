//// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pure } from 'recompose';
import { createStyleSheet } from '@/utils';

type Props = {
  children: React$Element<any>,
  style: any,
};

const Body = ({ children, style }: Props) => (
  <View style={StyleSheet.flatten([styles.wrapper, style])}>
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
