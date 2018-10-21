// @flow

import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { COLORS } from '@/constants';
import * as Icons from '@/assets/icons';

const IconsScreen = () => (
  <View style={{ flex: 1, padding: 50, flexDirection: 'row', flexWrap: 'wrap' }}>
    {_.map(Icons, (Comp, i) => <Comp color={COLORS.GREEN} key={i} />)}
  </View>
);

export default IconsScreen;
