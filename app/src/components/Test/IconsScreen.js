// @flow

import _ from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import { COLORS } from '@/constants';
import { IconButton } from '@/components/fragments';
import * as Icons from '@/assets/icons';

const IconsScreen = ({ navigation }) => (
  <ScrollView contentContainerStyle={{ padding: 50, flexDirection: 'row', flexWrap: 'wrap' }}>
    {_.map(Icons, (icon, i) => <IconButton icon={icon} onPress={() => navigation.push('Screen2')} key={i} style={{ margin: 20 }} />)}
  </ScrollView>
);

export default IconsScreen;
