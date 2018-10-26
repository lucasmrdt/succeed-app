// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { onlyUpdateForKeys } from 'recompose';
import { createStyleSheet } from '@/utils';
import * as Constants from '@/constants';

type Props = {
  label: string,
  value: string,
};

const TextValue = (props: Props) => {
  const { label, value } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = createStyleSheet({
  wrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    flexDirection: 'column',
  },
  value: {
    color: Constants.COLORS.GREEN,
    fontFamily: 'poppins-bold',
    fontSize: 16,
  },
  label: {
    color: Constants.COLORS.GREEN,
    fontFamily: 'poppins',
    fontSize: 9,
  },
});

// Never update!
const OptimizedTextValue: React$Element<Props> = (
  onlyUpdateForKeys(['value'])(TextValue)
);
export default OptimizedTextValue;
