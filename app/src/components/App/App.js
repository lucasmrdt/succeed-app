// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { Font } from 'expo';
import { ProgressBar, VerticalProgress, HorizontalProgress, CircleProgress, TextValue } from '@/components/fragments';
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
      <React.Fragment>
        <HorizontalProgress
          progress={this.state.progress}
          text={`${Math.floor(this.state.progress * 100)} / 200`}
          color={Constants.COLORS.GREEN}
          size='xl'
        />
        <VerticalProgress
          progress={this.state.progress}
          renderText={(progress) => <TextValue value={`${Math.round(progress)} %`} label='of your goal' />}
          text='of your goal'
        />
        <CircleProgress
          renderText={(progress) => <TextValue value='17' label='days left' />}
          progress={this.state.progress}
          color={Constants.COLORS.GREEN}
        />
      </React.Fragment>
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: Constants.SIZES.HEIGHT,
    width: Constants.SIZES.WIDTH,
  },
});

export default App;

