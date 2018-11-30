import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../services/NavigationService';
import ExtStyle from '../utils/styles';

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

const IntroHeader = ({ back, keyboard, fn }) => (
  <View
    style={[styles.container, { marginTop: keyboard === true ? null : '17%' }]}
  >
    <View style={{ marginLeft: !back ? null : '13%', flex: 1 }}>
      {back ? (
        <View>
          <TouchableOpacity onPress={fn}>
            <Image
              resizeMode="contain"
              style={{}}
              source={require('../../assets/img/back.png')}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
    <View style={[ExtStyle.flex1, !back ? { alignItems: 'center' } : null]}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../assets/img/logo.png')}
      />
    </View>
    <View style={ExtStyle.flex1} />
  </View>
);

export default IntroHeader;
