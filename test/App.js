import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChartTest from './src/ChartTest';
import SharedAnimation from './src/SharedAnimation';
import SwipableNav from './src/SwipableTabNav';

export default () => <SwipableNav />;
// export default () => <SharedAnimation />;

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <ChartTest />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
