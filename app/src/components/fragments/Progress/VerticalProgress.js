import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet } from '@/utils';
import * as Constants from '@/constants';
import ProgressBar from './ProgressBar';

type Props = {
  progress: number,
  text?: string,
};

const VerticalProgress = (props: Props) => {
  const { progress, text } = props;

  return (
    <View style={styles.wrapper}>
      {text && <View style={styles.textWrapper}>
        <Text style={styles.textProgress}>
          {`${Math.round(progress * 100)} %`}
        </Text>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>}
      <ProgressBar
        animateAtMount
        animatedProgress={progress}
        direction='vertical'
        color={Constants.COLORS.GREEN}
        size={{
          // Think about is horizontal progress bar rotated.
          height: 22,
          width: 64,
        }}
        style={{
          progress: styles.progressBar,
          wrapper: styles.progressWrapper,
        }}
      />
    </View>
  );
}

const styles = createStyleSheet({
  wrapper: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: Constants.COLORS.TRANSPARENT_GREEN,
  },
  progressBar: {
    borderRadius: 0,
  },
  textWrapper: {
    ...Constants.STYLES.CENTER_CHILDS,
    flexDirection: 'column',
  },
  textProgress: {
    color: Constants.COLORS.GREEN,
    fontFamily: 'poppins-bold',
    fontSize: 16,
  },
  text: {
    color: Constants.COLORS.GREEN,
    fontFamily: 'poppins',
    fontSize: 11,
  },
})

export default VerticalProgress;
