// @flow

import React from 'react';
import Touchable from './Touchable';
import { StylisedText } from '../Text';
import { COLORS } from '@/constants';
import { getIcon, createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';
import { type IconType } from '@/types/dataTypes';
import { type TouchableProps } from './Touchable';

const LETTER_SPACING = 1;
const MARGIN_BETWEEN_TEXT_ICON = 10;
const ICON_SIZE = 15;

type Props = TouchableProps & {
  icon: IconType,
  color: string,
  textStyle: StylesheetType,
  background: React.ComponentType<any>,
};

class LightButton extends React.PureComponent<Props> {
  static defaultProps = {
    color: COLORS.GREEN,
    icon: null,
    background: null,
    textStyle: null,
    style: null,
  };

  render() {
    const {
      children,
      icon,
      style,
      color,
      background,
      textStyle,
      ...props
    } = this.props;
    const Icon = getIcon(icon);

    return (
      <Touchable {...props} style={[ styles.wrapper, style ]}>
        <StylisedText
          style={[ styles.text, textStyle ]}
          color={color}
          letterSpacing={LETTER_SPACING}
        >
          {children}
        </StylisedText>
        {/* $FlowFixMe don't understand... */}
        {Icon && <Icon size={ICON_SIZE} color={color}/>}
        {background}
      </Touchable>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: MARGIN_BETWEEN_TEXT_ICON,
  },
});

export default LightButton;
