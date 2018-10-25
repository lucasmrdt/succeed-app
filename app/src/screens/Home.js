// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { FilterOverlay } from '@/containers';
import { Link, Overlay, StylisedText } from '@/components/fragments';
import { Level, Header } from '@/components';
import { type RNTypes } from '@/types';
import { STYLES, SIZES, COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

type Props = RNTypes.NavigationType;

class Home extends React.Component<Props> {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <View style={styles.wrapper}>
        <FilterOverlay />
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
