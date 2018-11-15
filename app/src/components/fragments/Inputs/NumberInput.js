// @flow

import React from 'react';
import { View } from 'react-native';
import Picker from 'react-native-picker-select';
import TextInput from './TextInput';
import { StylisedText } from '../Text';
import { createStyleSheet } from '@/utils';
import { COLORS, SIZES } from '@/constants';
import { DownArrow } from '@/assets/icons';

import { type TextInputType } from './TextInput';

type Props = {
  units: Array<string>,
  style: any,
} & TextInputType;

type State = {
  selectedUnit: string,
  units: Array<{ value: string, label: string }>,
};

class NumberInput extends React.PureComponent<Props, State> {

  static defaultProps: Props = {
    units: ['min'],
    style: null,
  };

  constructor(props: Props) {
    super(props);

    const { units } = props;
    this.state = {
      selectedUnit: units[0],
      units: units.map(u => ({ label: u, value: u })),
    };
  }

  onValueChange = (value: string) => {
    this.setState({ selectedUnit: value });
  };

  onEndEditing = (value: any) => {
    const { onEndEditing } = this.props;
    const { selectedUnit } = this.state;

    onEndEditing({
      unit: selectedUnit,
      value,
    });
  };

  renderPicker() {
    const { selectedUnit } = this.state;

    return (
      <View style={styles.picker}>
        <StylisedText color={COLORS.PURPLE} style={styles.pickerText}>
          {selectedUnit}
        </StylisedText>
        <DownArrow color={COLORS.PURPLE}  size={SIZES.ICON_SIZE_S} />
      </View>
    );
  }

  render() {
    const { units: _, style, ...inputProps } = this.props;
    const { selectedUnit, units } = this.state;

    return (
      <View style={[styles.wrapper, style]}>
        <TextInput
          {...inputProps}
          style={styles.inputWrapper}
          inputStyle={styles.input}
          keyboardType='numeric'
          onEndEditing={this.onEndEditing}
        />
        <Picker
          items={units}
          value={selectedUnit}
          onValueChange={this.onValueChange}
          disabled={units.length === 1}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
          hideIcon
        >
          {this.renderPicker()}
        </Picker>
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
    width: 175,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PURPLE,
  },
  inputWrapper: {
    width: '65%',
    borderBottomWidth: 0,
  },
  input: {
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 23,
  },
  picker: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    marginRight: 10,
  },
});

export default NumberInput;
