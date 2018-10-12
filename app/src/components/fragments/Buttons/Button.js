// @flow

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { RNTypes } from '@/types';

export type Props = {
  onPress: (id: string) => void,
  id?: string,
  children?: React.Component,
  style?: RNTypes.StylesheetType,
};

class Button extends React.Component<Props> {
  state: State = {
    style: null,
  };

  static defaultProps = {
    id: null,
    style: null,
  };

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string,
  };

  shouldComponentUpdate(nextProps: Props) {
    const {
      style,
      children,
    } = this.props;

    return (children !== nextProps.children
    || !_.isEqualWith(style, nextProps.style));
  }

  onPress = () => {
    const { onPress, id } = this.props;
    onPress(id);
  }

  render() {
    const { children, style } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={style}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default Button;
