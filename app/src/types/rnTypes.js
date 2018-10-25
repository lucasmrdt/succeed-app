// @flow

// $FlowFixMe
import { type NavigationInjectedProps } from 'react-navigation';

export type StylesheetType = {
  backfaceVisibility?: 'visible' | 'hidden',
  backgroundColor?: string,
  borderBottomColor?: string,
  borderBottomEndRadius?: number,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderBottomStartRadius?: number,
  borderBottomWidth?: number,
  borderColor?: string,
  borderEndColor?: string,
  borderLeftColor?: string,
  borderLeftWidth?: number,
  borderRadius?: number,
  borderRightColor?: string,
  borderRightWidth?: number,
  borderStartColor?: string,
  borderStyle?: 'solid' | 'dotted' | 'dashed',
  borderTopColor?: string,
  borderTopEndRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderTopStartRadius?: number,
  borderTopWidth?: number,
  borderWidth?: number,
  opacity?: number,
  testID?: string,
  elevation?: number,
  color?: string,
  fontFamily?: 'poppins' | 'poppins-light' | 'poppins-bold',
  fontSize?: number,
  fontStyle?: 'normal' | 'italic',
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  letterSpacing?: number,
  lineHeight?: number,
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through',
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed',
  textDecorationColor?: string,
  textShadowColor?: string,
  textShadowOffset?: { width: number, height: number },
  textShadowRadius?: number,
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around',
  alignSelf?: 'auto',
  aspectRatio?: number,
  borderBottomWidth?: number,
  borderEndWidth?: number | string,
  borderLeftWidth?: number,
  borderRightWidth?: number,
  borderStartWidth?: number | string,
  borderTopWidth?: number,
  borderWidth?: number,
  bottom?: number | string,
  display?: 'none' | 'flex',
  end?: number | string,
  flex?: number,
  flexBasis?: number | string,
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
  height?: number | string,
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  left?: number | string,
  margin?: number | string,
  marginBottom?: number | string,
  marginEnd?: number | string,
  marginHorizontal?: number | string,
  marginLeft?: number | string,
  marginRight?: number | string,
  marginStart?: number | string,
  marginTop?: number | string,
  marginVertical?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  overflow?: 'visible' | 'hidden' | 'scroll',
  padding?: number | string,
  paddingBottom?: number | string,
  paddingEnd?: number | string,
  paddingHorizontal?: number | string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingStart?: number | string,
  paddingTop?: number | string,
  paddingVertical?: number | string,
  position?: 'absolute' | 'relative',
  right?: number | string,
  start?: number | string,
  top?: number | string,
  width?: number | string,
  zIndex?: number,
  direction?: 'inherit' | 'ltr' | 'rtl',
  backfaceVisibility?: 'visible' | 'hidden',
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  backgroundColor?: string,
  borderColor?: string,
  borderWidth?: number,
  borderRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  overflow?: 'visible' | 'hidden',
  overlayColor?: string,
  tintColor?: string,
  opacity?: number,
  shadowColor?: string,
  shadowOffset?: {
    width?: number,
    height?: number,
  },
  shadowOpacity?: number,
  shadowRadius?: number,
};

export type NavigationType = NavigationInjectedProps;
