// @flow

import React from 'react';
import { Text, View, Animated, FlatList } from 'react-native';
import {
  AnimatedRoundedButton,
  ProgressBar,
  HorizontalProgress,
  VerticalProgress,
  CircleProgress,
  Button,
} from '@/components/fragments';
import { RNTypes } from '@/types';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

const DATA = [...Array(16)].map((_, i) => `this is the ${i}`);

type Props = RNTypes.NavigationInjectedProps;

class Test extends React.Component<Props> {
  state = {
    progress: .7,
  }

  componentDidMount() {
    // setInterval(() => this.setState(s => s.progress < 1 ? ({ progress: s.progress + .05}) : s), 1500);
  }

  onPress = (buttonId) => {
    this.props.navigation.push('Screen2', { buttonId });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Button
          style={{
            marginBottom: 30,
          }}
          key={'test'}
          id={'test'}
          color={'blue'}
          size={{width: 200, height: 50}}
          onPress={this.onPress}
        >
          <Text>{'petit poid'}</Text>
        </Button>
      </View>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    // ...Constants.STYLES.CENTER_CHILDS,
    alignItems: 'center',
    backgroundColor: 'blue',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
});

export default Test;

