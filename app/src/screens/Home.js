// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Filter } from '@/containers';
import { Link } from '@/components/fragments';
import { Level } from '@/components';
import { STYLES, COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type NavigationType } from '@/types/rnTypes';

type Props = NavigationType;

class Home extends React.Component<Props> {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <View style={styles.wrapper}>
        <Filter light />
        <Level
          style={STYLES.HEADER_RIGHT}
          score={12}
          limit={20}
          progress={17}
        />
        <Link to='Screen2' rounded='fully' style={styles.button} color={COLORS.WHITE}>
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
    backgroundColor: COLORS.PURPLE,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 25,
    backgroundColor: COLORS.WHITE,
  },
});

export default Home;
