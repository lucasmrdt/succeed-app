// @flow

// import React from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Button from './Button';
import { COLORS, ANIMATIONS } from '@/constants';

import { type RNTypes } from '@/types';

type Props = RNTypes.NavigationType & {
  to: string,
  size?: { height: number, width: number },
  id?: string,
  optimized?: bool,
  color?: string,
  rounded?: 'fully' | 'little',
  light?: bool,
  style?: RNTypes.StylesheetType,
};

class Link extends React.PureComponent<Props> {
  static defaultProps = {
    ...Button.defaultProps,
    id: ANIMATIONS.SHARED_BACKRGOUND_ID,
  };

  static propTypes = {
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    to: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    color: PropTypes.string,
    optimized: PropTypes.bool,
    rounder: PropTypes.oneOf(['fully', 'little']),
    light: PropTypes.bool,
    style: PropTypes.any,
  };

  onPress = (id: string) => {
    const { to, navigation } = this.props;
    const params = {[ANIMATIONS.SHARED_BACKRGOUND_KEY]: id};
    navigation.navigate(to, params);
  }

  render() {
    return (
      <Button
        {...this.props}
        onPress={this.onPress}
      />
    );
  }
}

const LinkWithNavigation: React.ComponentType<Props> = withNavigation(Link);

export default LinkWithNavigation;
