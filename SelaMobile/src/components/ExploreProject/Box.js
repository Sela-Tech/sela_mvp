import React from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import Text from '../Text';
import { YELLOW, WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 3,
    width: width / 1.1,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
  },
  boxHeight: {
    height: height / 6,
    borderRadius: 10,
  },
  fontS: {
    fontSize: 15,
  },
  viewInImage: {
    backgroundColor: '#C13C1E',
    width: width / 4,
    position: 'absolute',
    top: 20,
    left: 30,
    zIndex: 3,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

const Box = ({ img, cost, firstText, secondText, thirdText, title, tags }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.boxHeight}>
      <Image
        resizeMode="cover"
        source={img}
        style={{ height: height / 6, width: width / 1.1, borderRadius: 10 }}
      />
      <View style={styles.viewInImage}>
        <View>
          <Image source={require('../../../assets/money.png')} />
        </View>
        <View>
          <Text style={{ color: WHITE }}> 34% funded </Text>
        </View>
      </View>
    </View>
    <View
      style={[
        styles.boxHeight,
        { paddingLeft: '5%', justifyContent: 'center' },
      ]}
    >
      <View style={[styles.row, { marginTop: 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#696F74' }}>
            {firstText}
          </Text>
          <Entypo name="dot-single" size={20} color="#696F74" />
        </View>
        <View style={{ paddingLeft: '2%', flexDirection: 'row' }}>
          <Text style={[styles.fontS, { fontWeight: '400', color: '#696F74' }]}>
            {secondText}
          </Text>
          <Entypo name="dot-single" size={20} color="#696F74" />
        </View>
        <View style={{ paddingLeft: '2%' }}>
          <Text style={{ fontWeight: '400', color: YELLOW }}> {thirdText}</Text>
        </View>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ fontSize: 20, fontWeight: '400', color: '#201D41' }}>
          {title}
        </Text>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ fontSize: 20 }}>{cost}</Text>
      </View>
      <View
        style={{
          marginTop: '2%',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          <Text style={{ color: '#EB5757', fontWeight: '500' }}>{tags[0]}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../../../assets/badge.png')} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Box.defaultProps = {};

Box.propTypes = {
  fund: PropTypes.string,
  cost: PropTypes.string, //.isRequired,
  fn: PropTypes.func,
  title: PropTypes.string,
  third: PropTypes.number,
  firstText: PropTypes.string,
  secondText: PropTypes.string,
  // medium: PropTypes.bool,
};

export default Box;
