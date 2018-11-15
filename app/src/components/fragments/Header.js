// @flow

import React from 'react';
import { View } from 'react-native';
import { pure } from 'recompose';
import { SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';

const PADDING = 20;

type Props = {
  children: React$Element<any>,
  style: StylesheetType,
};

const Header = ({ children, style }: Props) => (
  <View style={[styles.wrapper, style]}>
    {children}
  </View>
);

const styles = createStyleSheet({
  wrapper: {
    zIndex: 2,
    height: SIZES.STATUS_BAR_HEIGHT,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING,
    paddingRight: PADDING,
  },
});

export default pure(Header);
