// @flow

import React from 'react';
import { TextInput, View } from 'react-native';
import { createStyleSheet } from '@/utils';
import { COLORS } from '@/constants';

import { type TextInputProps } from 'react-native';

type Props = {
  icon: React.ComponentType<any>,
  onEndInput: (value: string | number) => void,
  onStatusChange: (isValid: bool) => void,
  minLength: number,
  style: any,
  inputStyle: any,
} & TextInputProps;

type State = {
  isValid: false,
  value: string | number,
};

class CustomTextInput extends React.PureComponent<Props, State> {

  static defaultProps: Props = {
    icon: null,
    inputStyle: null,
    style: null,
    onStatusChange: () => null,
    minLength: 1,
  };

  state: State = {
    value: null,
  };

  onChange = (value: string | number) => {
    const { minLength, onStatusChange } = this.props;
    const isValid = `${value}`.length >= minLength;

    this.setState((state: State) => {
      if (isValid !== state.isValid) {
        onStatusChange(isValid);
      }
      return { isValid, value };
    });
  }

  onEndEditing = () => {
    const { onEndEditing } = this.props;
    const { value } = this.state;
    onEndEditing(value);
  }

  render() {
    const { icon, style, inputStyle, ...props } = this.props;
    const { value } = this.state;

    return (
      <View style={[styles.wrapper, style]}>
        {icon}
        <TextInput
          {...props}
          value={value}
          style={[styles.input, inputStyle]}
          onEndEditing={this.onEndEditing}
          onBlur={() => console.log('blur!')}
          onChangeText={this.onChange}
          autoCorrect={false}
          autoCapitalize='none'
          underlineColorAndroid='rgba(0, 0, 0, 0)'
          autoFocus
          allowFontScaling
        />
      </View>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PURPLE,
  },
  input: {
    position: 'absolute',
    left: 0,
    paddingLeft: 25,
    color: COLORS.DARK_GRAY,
    fontSize: 20,
    fontFamily: 'poppins-bold',
    width: '100%',
    height: '100%',
  },
});

export type TextInputType = Props;
export default CustomTextInput;
