// @flow

// import React from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Button, { type ButtonProps } from './Button';
import { ANIMATIONS } from '@/constants';

import { type NavigationType } from '@/types/rnTypes';

type Props = ButtonProps & {
  navigation: NavigationType,
  to: string,
};

class Link extends React.PureComponent<Props> {
  static defaultProps = Button.defaultProps

  static propTypes = {
    ...Button.propTypes,
    onPress: PropTypes.func,
  }

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

// $FlowFixMe Weird ... Thank's flow-typed ....
const LinkWithNavigation: React$Element<Props> = withNavigation(Link);

export default LinkWithNavigation;
