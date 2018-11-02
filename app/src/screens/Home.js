// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { FilterOverlay, FilterButton, Level, TaskList } from '@/containers';
import { Link, Header, StylisedButton, Wrapper, Body } from '@/components/fragments';
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
      <Wrapper>
        <FilterOverlay />
        <Header>
          <FilterButton />
          <Level />
        </Header>
        <Body>
          <TaskList />
        </Body>
      </Wrapper>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
