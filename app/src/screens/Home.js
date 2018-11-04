// @flow

import React from 'react';
import {
  FilterOverlay,
  FilterButton,
  Level,
  TaskList,
} from '@/containers';
import {
  Header,
  StylisedButton,
  Wrapper,
  Body,
  Touchable,
} from '@/components/fragments';
import { COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

const BUTTON_SIZE = {
  width: 100,
  height: 45,
};

import { type NavigationType } from '@/types/rnTypes';

type Props = {
  navigation: NavigationType
};

class Home extends React.Component<Props> {
  shouldComponentUpdate = () => false;

  onTaskPress = () => {
    this.props.navigation.navigate('Screen2');
  }

  onPressLevel = () => {
    this.props.navigation.navigate('Profile');
  }

  renderButton() {
    return (
      <StylisedButton
        rightIcon='Add'
        justify='space-between'
        iconSize={15}
        style={styles.button}
        primaryColor={COLORS.PURPLE}
        rounded='fully'
        size={BUTTON_SIZE}
        onPress={() => console.log('new')}
        gradient
        attractive
      >
        NEW
      </StylisedButton>
    );
  }

  render() {
    return (
      <Wrapper>
        <FilterOverlay />
        <Header>
          <FilterButton />
          <Touchable onPress={this.onPressLevel}>
            <Level />
          </Touchable>
        </Header>
        <Body>
          <TaskList onItemPress={this.onTaskPress}/>
          {this.renderButton()}
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
    bottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default Home;
