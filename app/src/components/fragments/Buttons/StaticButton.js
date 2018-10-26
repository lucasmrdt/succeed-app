// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Touchable from './Touchable';

import { type TouchableProps } from './Touchable';

type Props = TouchableProps;

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

    return (
      <Touchable {...props}>
        {children}
      </Touchable>
    );
  }
};

export default StaticButton;
