// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { pure } from 'recompose';

type Props = {
  children: any,
  blacklist: Array<string>,
};

const WithProps = ({
  children: childs,
  blacklist = [],
  ...props
}: Props) => (
  React.Children.map(childs, children => {
    let { children: subChildren, style } = children.props;
    if (!children.type in blacklist
    && typeof subChildren === "object") {
      subChildren = WithProps({
        ...props,
        children: subChildren
      });
    }
    const newChildren = React.cloneElement(children, {
      ...props,
      style: StyleSheet.flatten([props.style, style]),
      children: subChildren,
    });
    return newChildren;
  })
);

export default pure(WithProps);
