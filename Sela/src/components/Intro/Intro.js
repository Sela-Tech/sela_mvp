import React from 'react';
import {
  View, Image, Text, StyleSheet, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  longText: {
    color: '#696F74',
    fontSize: 15,
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
          <Text style={{ fontWeight: '500', fontSize: 25 }}>
            {' '}
            {shortText}
            {' '}
          </Text>
        </View>
        <View style={{
          marginTop: 15, justifyContent: 'center',
        }}
        >
          <Text style={styles.longText}>{display[0]}</Text>
          <Text style={styles.longText}>{display[1]}</Text>
          <Text style={styles.longText}>{display[2]}</Text>
          <Text style={styles.longText}>{display[3]}</Text>
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
