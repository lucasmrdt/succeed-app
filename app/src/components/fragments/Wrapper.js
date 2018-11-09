// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pure } from 'recompose';
import { SIZES, COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';

type Props = {
  children: React$Element<any>,
  style: StylesheetType,
};

const Wrapper = ({ children, style }: Props) => (
  <View style={[styles.wrapper, style]}>
    {children}
  </View>
);

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SIZES.BOTTOM_TAB_BAR_HEIGHT,
    paddingTop: SIZES.STATUS_BAR_PADDING,
    backgroundColor: COLORS.WHITE,
  },
});

export default pure(Wrapper);
