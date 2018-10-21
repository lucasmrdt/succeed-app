#!/usr/bin/python3

import re
import sys
import os

PARAMS_TO_REPLACE_BY_TAGS = {
  'svg': [ {'width': '{size}'}, {'height': '{size}'} ],
  'path': [ {'fill': '{color}'}, {'fill-opacity': '"1"'} ],
  'circle': [ {'fill': '{color}'}, {'fill-opacity': '"1"'} ],
}
TAGS_TO_REPLACE = [key for key in PARAMS_TO_REPLACE_BY_TAGS]
TAGS_TO_CAP = TAGS_TO_REPLACE
PATTERN = '''// @flow

import React from 'react';
import { Svg } from 'expo';
import IconWrapper from './IconWrapper';
const { Path } = Svg;

class %s extends IconWrapper {
  render() {
    const { size, color } = this.props;
    return (
      %s
    );
  }
}

export default %s;
'''

tagRegex = re.compile('(?:<)({0})'.format('|'.join(TAGS_TO_CAP)))

def parseSvgLine(line):
  tag = re.match(tagRegex, line).group(1)
  line = re.sub(tagRegex, lambda x: '<' + x.group(1).capitalize(), line)

  paramsToReplace = PARAMS_TO_REPLACE_BY_TAGS[tag]
  if paramsToReplace:
    for param in paramsToReplace:
      name, replace = list(param.items())[0]
      regex = re.compile('(?:{name}=)("[#,()0-9a-zA-Z.]+")'.format(name=name))
      line = re.sub(regex, '{name}={replace}'.format(name=name, replace=replace), line)

  return line

if __name__ == '__main__':

  if len(sys.argv) != 2:
    print('USAGE: {0} name'.format(sys.argv[0]))
    exit(1)

  name = sys.argv[1].capitalize()
  svg = ''

  while True:
    line = input()
    if re.match(r'</svg>', line):
      svg += '</Svg>'
      break
    svg += parseSvgLine(line)

  output = PATTERN % (name, svg, name)
  with open(name + '.js', 'w') as f:
    f.write(output)
