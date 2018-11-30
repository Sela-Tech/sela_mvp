import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  longText: {
    color: '#696F74',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

const Intro = ({ image, shortText, longText }) => {
  const display = longText.split('\n');
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={image}
          resizeMode="cover"
          style={{ height: height / 1.6, width }}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontWeight: '400', fontSize: 25, color: '#222829' }}>
            {' '}
            {shortText}
{' '}
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.longText}>{display[0].trim('')}</Text>
          <Text style={styles.longText}>{display[1].trim('')}</Text>
          <Text style={styles.longText}>{display[2].trim('')}</Text>
          <Text style={styles.longText}>{display[3].trim('')}</Text>
        </View>
      </View>
    </View>
  );
};

Intro.propTypes = {
  shortText: PropTypes.string,
  longText: PropTypes.string,
  image: PropTypes.number,
};

export default Intro;
