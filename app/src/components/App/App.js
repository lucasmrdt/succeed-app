import React from 'react';
import { Text, View } from 'react-native';
import { Font } from 'expo';
import { ProgressBar } from '@/components/fragments';
import * as Constants from '@/constants';
import * as Utils from '@/utils';

class App extends React.Component {
  state = {
    isLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync(Constants.FONTS);
    this.setState({ isLoaded: true });
  }


  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.wrapper}>
        {!isLoaded
          ? <Text>loading ...</Text>
          : <ProgressBar
            animateAtMount
            animatedProgress={.5}
            size='xl'
            color={Constants.COLORS.GREEN}
          />
        }
      </View>
    );
  }
};

const styles  = Utils.createStyleSheet({
  wrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    height: Constants.SIZES.height,
    width: Constants.SIZES.width,
  },
});

export default App;

