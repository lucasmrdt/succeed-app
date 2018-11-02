// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pure } from 'recompose';
import { SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';

type Props = {
  children: React$Element<any>,
  style: StylesheetType,
};

const Footer = ({ children, style }: Props) => (
  <View style={StyleSheet.flatten(styles.wrapper, style)}>
    {children}
  </View>
);

const styles = createStyleSheet({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    height: SIZES.BOTTOM_TAB_BAR_HEIGHT,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default pure(Footer);
