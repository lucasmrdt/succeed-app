// @flow

import React from 'react';
import { Text } from 'react-native';

class LoadScreen extends React.Component<void> {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <Text>loading</Text>
    );
  }
}

export default LoadScreen;
