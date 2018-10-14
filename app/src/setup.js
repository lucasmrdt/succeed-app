// @flow

import { Font } from 'expo';
import { FONTS } from '@/constants';

const setup = async () => {
  await Font.loadAsync(FONTS);
};

export default setup;
