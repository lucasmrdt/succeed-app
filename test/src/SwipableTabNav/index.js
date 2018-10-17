import React from 'react';
import { View, Text, Animated, Button, TouchableWithoutFeedback, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createFluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import { createMaterialTopTabNavigator, TabBarBottom } from 'react-navigation';

const Screen1_A = (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Transition shared="shared">
      <View style={{ width: 200, height: 200, backgroundColor: 'blue' }} />
    </Transition>
    <TouchableWithoutFeedback
      onPressIn={() => props.navigation.push('Screen1_B')}
    >
      <View style={{ height: 30, width: 100, backgroundColor: 'red' }}>
        <Text>NEXT!</Text>
      </View>
    </TouchableWithoutFeedback>
    <Button onPress={() => props.navigation.push('Screen1_B')} title='next' />
  </View>
)
const Screen1_B = (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Transition shared="shared">
      <View style={{ width: 100, height: 100, backgroundColor: 'pink' }} />
    </Transition>
    <Button onPress={() => props.navigation.goBack()} title='back' />
  </View>
)
const Screen1 = createFluidNavigator({
  Screen1_A: { screen: Screen1_A },
  Screen1_B: { screen: Screen1_B },
}, {
  transitionConfig: {
    duration: 150,
    timing: Animated.timing,
    easing: Easing.easing,
    delay: 0,
  }
});
const Screen2 = () => <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >screen 1</Text>;

class Tab extends React.Component {
  render() {
    const { navigation } = this.props;
    const { routes } = navigation.state;

    console.log(this.props)
    const inputRange = [-1, ...routes.map((x, i) => i)];

    return (
      <View>
        {routes.map((route, index) => {
          const outputRange = inputRange.map(i => i === index ? 100 : 50);
          const size = this.props.position.interpolate({
            inputRange,
            outputRange,
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: size,
                height: size,
                backgroundColor: 'blue',
              }}
            />
          );
        })}
      </View>
    );
  }
}

const Nav = createMaterialTopTabNavigator({
  Screen1: {
    screen: Screen1,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <Ionicons name='ios-briefcase' size={focused ? 20 : 15}/>
    },
  },
  Screen2: {
    screen: Screen2,
    navigationOptions: {
      tabBarIcon: ({ focused, ...rest }) => !console.log(rest) &&   <Ionicons name='ios-briefcase' size={focused ? 20 : 15}/>
    },
  },
}, {
  tabBarComponent: (p) => <Tab {...p} />,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    showIcon: true,
    showLabel: false,
    pressOpacity: 0,
    pressColor: 'rgba(0, 0, 0, 0)',
  },
});

export default Nav;
