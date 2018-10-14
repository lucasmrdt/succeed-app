// @flow

import React from 'react';
import { Text, View } from 'react-native';
import {
  AnimatedRoundedButton,
} from '@/components/fragments';
import { RNTypes } from '@/types';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

type Props = RNTypes.NavigationInjectedProps;

class Test extends React.Component<Props> {
  state = {
    progress: .1,
  }

  onPress = () => {
    this.props.navigation.push('Screen2');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <AnimatedRoundedButton
          rounded='fully'
          size={{ width: 200, height: 50 }}
          onPress={this.onPress}
          color={Constants.COLORS.GREEN}
          id='ok'
        >
          <Text>1</Text>
          <Text>2</Text>
        </AnimatedRoundedButton>
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

export default Test;

