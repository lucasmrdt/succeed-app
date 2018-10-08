import React from 'react';
import { Text, View } from 'react-native';
import { Font } from 'expo';
import { ProgressBar } from '@/components/fragments';
import * as Constants from '@/constants';
import * as Utils from '@/utils';

class App extends React.Component {
  state = {
    isLoaded: false,
    progress: .1,
  }

  async componentDidMount() {
    await Font.loadAsync(Constants.FONTS);
    this.setState({ isLoaded: true });

    setInterval(() => this.setState(prev => ({ progress: prev.progress + .05 })), 1000);
  }

  renderContent() {
    return (
      <View>
        <ProgressBar
          animatedProgress={this.state.progress}
          color={Constants.COLORS.GREEN}
          textContent={`${Math.floor(this.state.progress * 100)} %`}
        />
      </View>
    );
  }


  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.wrapper}>
        {!isLoaded
          ? <Text>loading ...</Text>
          : this.renderContent()
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

