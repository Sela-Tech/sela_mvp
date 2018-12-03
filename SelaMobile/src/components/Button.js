import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

const { height, width } = Dimensions.get('window');
const styles = {
  buttonStyle: {
    justifyContent: 'center',
    width: width / 1.3,
    borderRadius: 5,
    alignItems: 'center',
  },
};

const Button = ({ text, color, textColor, fn, textSize, medium, style }) => (
  <TouchableOpacity
    onPress={fn}
    style={[
      styles.buttonStyle,
      { height: medium ? height / 11 : height / 14, backgroundColor: color },
      style,
    ]}
  >
    <Text style={{ color: textColor, fontSize: textSize }}>{text}</Text>
  </TouchableOpacity>
);

Button.defaultProps = {};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  fn: PropTypes.func,
  color: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.string,
  // medium: PropTypes.bool,
};

export default Button;
