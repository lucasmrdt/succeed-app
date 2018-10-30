// @flow

import React from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import {
  ButtonWithIcon,
  IconButton,
  LightButton,
} from '@/components/fragments';
import { Filter } from '@/containers';
import Level from '../Level';
import { Clock } from '@/assets/icons';
import { type StylesheetType } from '@/types/rnTypes';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

const DATA = [...Array(16)].map((_, i) => `this is the ${i}`);

type Props = RNTypes.NavigationType;

class Test extends React.Component<Props> {
  onPress = (buttonId) => {
    this.props.navigation.push('Screen2');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{ position: 'absolute', top: '50%', width: '100%', height: '50%', overflow: 'hidden', backgroundColor: 'white' }}>
          {/* <Filter /> */}
        </View>
      </View>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    // ...Constants.STYLES.CENTER_CHILDS,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'space-around',
    alignItems: 'center',
    // alignItems: 'space-arround',
    // justifyContent: 'space-arround',
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
