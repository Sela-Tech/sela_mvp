import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import Text from './Text';
import B from './BoldText';
import { WHITE } from '../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = {
  BoxStyle: {
    justifyContent: 'center',
    height: height / 9,
    width: width / 1.3,
    borderRadius: 10,
  },
};

const Box = ({
  color,
  textColor,
  fn,
  upText,
  downText,
  textSize,
  below,
  checked,
}) => (
  <View
    style={[
      styles.BoxStyle,
      {
        backgroundColor: color,
        borderColor: WHITE,
        borderWidth: below ? 1 : null,
        marginTop: below ? '3%' : null,
      },
    ]}
  >
    <TouchableOpacity
      onPress={fn}
      style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      {/* <View>
          <CheckBox
            color="#FFFFFF"
            checkboxTickColor="#F4F689"
            checked={checked}
          />
        </View> */}
      <View style={{ paddingLeft: '10%' }}>
        <B color={textColor}>{upText}</B>
        <Text style={{ color: textColor, fontSize: textSize }}>{downText}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

Box.propTypes = {
  fn: PropTypes.func.isRequired,
  upText: PropTypes.string.isRequired,
  downText: PropTypes.string.isRequired,
};

export default Box;
