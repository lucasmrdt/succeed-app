// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet } from '@/utils';
import * as Constants from '@/constants';

class Screen2 extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>screen2</Text>
      </View>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
});

export default Screen2;

