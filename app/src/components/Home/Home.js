// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Link } from '@/components/fragments';
import { type RNTypes } from '@/types';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

type Props = RNTypes.NavigationType;

class Home extends React.Component<Props> {
  render() {
    return (
      <View style={styles.wrapper}>
        <Link to='Screen2' rounded='fully' style={styles.button} color={Constants.COLORS.WHITE}>
          <Text>LINK</Text>
        </Link>
      </View>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.COLORS.PURPLE,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 25,
    backgroundColor: Constants.COLORS.WHITE,
  },
});

export default Home;
