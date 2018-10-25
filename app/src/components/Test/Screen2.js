// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { Button } from '@/components/fragments';
import { createStyleSheet } from '@/utils';
import * as Constants from '@/constants';
import { RNTypes } from '@/types';

type Props = RNTypes.NavigationInjectedProps;

class Screen2 extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const buttonId = navigation.getParam(Constants.ANIMATIONS.SHARED_BACKRGOUND_KEY, '');

    //console.log(`Render ${this.constructor.name}.`);
    return (
      <Transition appear='bottom'>
        <View style={styles.wrapper}>
          {/* <Transition shared={buttonId}>
            <View style={styles.background}/>
          </Transition>
          <Transition anchor={buttonId}> */}
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text>screen2</Text>
              <Button
                onPress={() => this.props.navigation.goBack()}
                size={{width: 200, height: 75}}
              >
                <Text>BACK!</Text>
              </Button>
            </View>
          {/* </Transition> */}
        </View>
      </Transition>
    );
  }
};

const styles  = createStyleSheet({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    backgroundColor: Constants.COLORS.GREEN,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
});

export default Screen2;

