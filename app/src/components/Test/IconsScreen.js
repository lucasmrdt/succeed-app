// @flow

import _ from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import { COLORS } from '@/constants';
import { ButtonIcon } from '@/components/fragments';
import * as Icons from '@/assets/icons';

const IconsScreen = () => (
  <ScrollView contentContainerStyle={{ padding: 50, flexDirection: 'row', flexWrap: 'wrap' }}>
    {_.map(Icons, (icon, i) => <ButtonIcon icon={icon} onPress={() => console.log('ok')} key={i} style={{ margin: 20 }} />)}
  </ScrollView>
);

export default IconsScreen;
