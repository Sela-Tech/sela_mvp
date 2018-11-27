import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import B from './BoldText';
import Text from './Text';

import { DEFAULT_COLOUR, WHITE, YELLOW } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLOUR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: WHITE,
    fontSize: 15,
  },
});

export default () => (
  <View style={styles.container}>
    <Spinner occupy={false} />
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
      }}
    >
      <Text style={styles.textStyle}> "Each of us can make a </Text>
      <Text style={styles.textStyle}>
        {' '}
        difference; together we make change"
{' '}
      </Text>
      <B color={YELLOW}> Barbara Milkuski </B>
    </View>
  </View>
);
