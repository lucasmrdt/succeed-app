// @flow

import React from 'react';
import { View } from 'react-native';
import { pure } from 'recompose';
import { SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

const HEIGHT = 80;
const PADDING = 20;

type Props = {
  children: React$Element<any>,
};

const Header = ({ children }: Props) => (
  <View style={styles.wrapper}>
    {children}
  </View>
);

const styles = createStyleSheet({
  wrapper: {
    zIndex: 100,
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING,
    paddingRight: PADDING,
  },
});

export default pure(Header);
