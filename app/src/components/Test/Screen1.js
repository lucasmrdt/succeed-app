// @flow

import React from 'react';
import { Text, View, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import {
  HorizontalProgress, VerticalProgress, Link,
} from '@/components/fragments';
import { type RNTypes } from '@/types';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

const DATA = [...Array(16)].map((_, i) => `this is the ${i}`);

type Props = RNTypes.NavigationType;

class Test extends React.Component<Props> {
  state = {
    progress: .2,
  }

  componentDidMount() {
  }

  onPress = (buttonId) => {
    this.props.navigation.push('Screen2', { [Constants.ANIMATIONS.SHARED_BACKRGOUND_KEY]: Constants.ANIMATIONS.SHARED_BACKRGOUND_ID });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* <TouchableWithoutFeedback
          onPress={this.onPress}
        >
          <View style={{ position: 'absolute', bottom: 100, width: 100, height: 25 }}>
            <Transition shared={Constants.ANIMATIONS.SHARED_BACKRGOUND_ID}>
              <View style={{ width: '100%', height: '100%', backgroundColor: Constants.COLORS.GREEN }}/>
            </Transition>
            <Text>OK</Text>
          </View>
        </TouchableWithoutFeedback> */}
        <Link to='Screen2' rounded='fully' style={{ position: 'absolute', bottom: 100 }}>
          <Text>LINK</Text>
        </Link>
        {/* <HorizontalProgress
          progress={this.state.progress}
          color={this.state.progress > .5 ? Constants.COLORS.GREEN : Constants.COLORS.BLACK}
        /> */}
      </View>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    // ...Constants.STYLES.CENTER_CHILDS,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 25,
    backgroundColor: Constants.COLORS.GREEN,
  },
});

export default Test;
