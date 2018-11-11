// @flow

import React from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
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
import { Filter } from '@/containers';
import Level from '../Level';
import { Clock } from '@/assets/icons';
import { type StylesheetType } from '@/types/rnTypes';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';

const DATA = [...Array(16)].map((_, i) => `this is the ${i}`);

type Props = RNTypes.NavigationType;

class Test extends React.Component<Props> {
  onPress = (buttonId) => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Wrapper style={styles.wrapper}>
        <Header>
          <StylisedText>HEAAAAAAAAAAAADER!</StylisedText>
        </Header>
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
          <StylisedButton
            onPress={this.onPress}
          >
            next !
          </StylisedButton>
        </Body>
        <KeyboardSpacer />
      </Wrapper>
    );
  }
};

const styles  = createStyleSheet({
  wrapper: {
    paddingBottom: 0,
    // ...Constants.STYLES.CENTER_CHILDS,
    // alignItems: 'space-arround',
    // justifyContent: 'space-arround',
    // backgroundColor: 'blue',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
  },
  body: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 25,
    backgroundColor: Constants.COLORS.GREEN,
  },
});

export default Test;
