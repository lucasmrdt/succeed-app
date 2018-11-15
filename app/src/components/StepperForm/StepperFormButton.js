// @flow

import React from 'react';
import { LightButton } from '@/components/fragments';
import { COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

type Props = {
  isLastScreen: bool,
  validText: string,
  errorText: string,
  isValid: bool,
  onPress: Function,
};

class StepperFormButton extends React.PureComponent<Props> {

  render() {
    const {
      isValid,
      isLastScreen,
      validText,
      errorText,
      onPress,
    } = this.props;


    const defaultValidText = isLastScreen ? 'finish' : 'next';
    const validIcon = isLastScreen ? 'Tick' : 'RightArrow';

    return (
      <LightButton
        disable={!isValid}
        color={isValid ? COLORS.GREEN_PASTEL : COLORS.RED_PASTEL}
        icon={isValid ? validIcon : 'Danger'}
        onPress={onPress}
        style={styles.button}
      >
        {isValid
          ? validText || defaultValidText
          : errorText
        }
      </LightButton>
    );
  }

}

const styles = createStyleSheet({
  button: {
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default StepperFormButton;
