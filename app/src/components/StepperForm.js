// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Line,
  StylisedButton,
  IconButton,
  LightButton,
  TextInput,
  StylisedText,
  Wrapper,
  Header,
  Body,
  NumberInput,
  Footer,
} from '@/components/fragments';
import { Rocket, Clock } from '@/assets/icons';
import { COLORS, SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type NavigationType } from '@/types/rnTypes';

const PRIMARY_COLOR = COLORS.PURPLE;
const PROGRESS_WIDTH = 250;

type Props = {
  navigation: NavigationType,
  renderBody: () => any,
  titleText: string,
  errorText: string,
  validText: string,
};

class StepperForm extends React.PureComponent<Props> {

  nextScreen = () => {
    const { navigation } = this.props;
    console.log(navigation.state);
    const stepIndex = navigation.getParam('stepIndex', 0);
    const stepLength = navigation.getParam('stepLength', 1);
    const routeName = navigation.getParam('routeName', '');

    navigation.navigate(routeName, {
      stepIndex: stepIndex + 1,
      stepLength,
      routeName,
    });
  };

  renderProgressBar() {
    const { navigation } = this.props;
    const stepIndex = navigation.getParam('stepIndex', 0);
    const stepLength = navigation.getParam('stepLength', 1);
    const progress = stepIndex / stepLength * PROGRESS_WIDTH;

    const progressStyle = StyleSheet.flatten([
      styles.progress,
      { paddingLeft: PROGRESS_WIDTH - progress },
    ]);

    return (
      <View style={progressStyle}>
        <View style={styles.progressIcon}>
          <Rocket color={PRIMARY_COLOR} size={SIZES.ICON_SIZE_L} />
        </View>
        <Line
          width='100%'
          color={PRIMARY_COLOR}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <Header>
        <StylisedText>{titleText}</StylisedText>
      </Header>
    );
  }

  renderTitle() {
    const { titleText } = this.props;

    return (
      <Header>
        <StylisedText>{titleText}</StylisedText>
      </Header>
    );
  }

  render() {
    const { renderBody } = this.props;

    return (
      <Wrapper style={styles.wrapper}>
        <Body style={styles.body}>
          <StylisedText>What do you want ?</StylisedText>
          <NumberInput
            icon={<Clock size={15} color={Constants.COLORS.PURPLE} />}
            onStatusChange={a => console.log('is valid ?', a)}
            onEndEditing={v => console.log('value', v)}
            maxLength={17}
            units={['sec', 'min', 'hour']}
            returnKeyType='next'
            placeholder='10'
          />
          <StylisedButton onPress={this.nextScreen}>next</StylisedButton>
        </Body>
        <KeyboardSpacer />
      </Wrapper>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    paddingBottom: 0,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: PROGRESS_WIDTH,
  },
  progressIcon: {
    transform: [{ rotate: '-90deg' }],
    backgroundColor: COLORS.WHITE,
  },
});

export default withNavigation(StepperForm);
