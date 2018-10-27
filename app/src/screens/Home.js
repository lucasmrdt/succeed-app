// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { FilterOverlay, FilterButton, Level } from '@/containers';
import { Link, Header } from '@/components/fragments';
// import { Level } from '@/components';
import { STYLES, COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type NavigationType } from '@/types/rnTypes';

type Props = {
  navigation: NavigationType
};

class Home extends React.Component<Props> {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <FilterOverlay>
        <Header>
          <FilterButton />
          <Level />
        </Header>

        <View style={styles.wrapper}>
          <Link to='Screen2' rounded='fully' style={styles.button} color={COLORS.WHITE}>
            <Text>LINK</Text>
          </Link>
        </View>
      </FilterOverlay>
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
