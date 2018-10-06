import React from 'react';
import { View, TouchableWithoutFeedback, Text, Dimensions, Animated, Easing } from 'react-native';
import { createFluidNavigator, Transition } from 'react-navigation-fluid-transitions';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const BUTTONS_STYLES = {
  backgroundColor: 'white',
  position: 'absolute',
  borderRadius: 100,
  width: 200,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
};

const Home = (props) => (
  <View
    style={{
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    }}
  >

    <TouchableWithoutFeedback
      onPress={() => !console.log('new click') && props.navigation.navigate('Create')}
    >
      <View
        style={{ position: 'absolute', bottom: 100, justifyContent: 'center', alignItems: 'center' }}
      >
        <Transition shared='background'>
          <View style={BUTTONS_STYLES} />
        </Transition>
        <Text>
          NEW ?
        </Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const Create = (props) => (
  <View style={{
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Transition shared='background'>
      <View style={{
        position: 'absolute',
        bottom: 0,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'white',
        borderRadius: 0,
      }}>
        <Text>DONE !!!</Text>
      </View>
    </Transition>
  </View>
);

const Navigator = createFluidNavigator({
  Home: { screen: Home },
  Create: {
    screen: Create,
    navigationOptions: {
      gesturesEnabled: true,
    }
  },
},
{
  gesturesEnabled: false,
  mode: 'card',
  transitionConfig: {
    duration: 900,
    easing: Easing.out(Easing.exp),
    timing: Animated.timing,
  },
});

export default Navigator;
