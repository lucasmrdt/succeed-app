// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Touchable from './Touchable';
import { createStyleSheet } from '@/utils';

import { type RNTypes } from '@/types';

type Props = {
  onPress: (id: string) => void,
  children: React.Component,
  id?: string,
  style?: RNTypes.StylesheetType,
};

class StaticButton extends React.PureComponent<Props> {
  static defaultProps = {
    id: null,
    style: null,
  };

  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.any,
  };

  render() {
    const { children, ...props } = this.props;
    // console.log(`Render ${this.constructor.name}.`);

    return (
      <Touchable {...props}>
        {children}
      </Touchable>
    );
  }
};

export default StaticButton;
