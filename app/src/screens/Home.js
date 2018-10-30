// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { FilterOverlay, FilterButton, Level } from '@/containers';
import { Link, Header, StylisedButton } from '@/components/fragments';
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
      <View style={styles.wrapper}>
        <FilterOverlay />
        <Header>
          <FilterButton />
          <Level />
        </Header>

        <View style={styles.wrapper}>
          <StylisedButton
            onPress={() => this.props.navigation.push('Screen2')}
          >
            LINK
          </StylisedButton>
        </View>
      </View>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
