import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createMaterialTopTabNavigator, TabBarBottom } from 'react-navigation';

const Screen1 = () => <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >screen 1</Text>;
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
