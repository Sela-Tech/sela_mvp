import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
  container: {
    height: height / 13,
    width: width / 1.3,
    borderRadius: 5,
    borderColor: '#F5F5F8',
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    flex: 1,
    paddingLeft: 14,
    fontSize: 15,
  },
  viewInImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    position: 'absolute',
    right: 10,
  },
};

const Input = ({
  text,
  secure,
  onTheChange,
  showPassword,
  medium,
  showPass,
}) => (
  <View
    style={[styles.container, { height: medium ? height / 11 : height / 11 }]}
  >
    <TextInput
      placeholder={text}
      placeholderTextColor="#F5F5F8"
      onChange={onTheChange}
      secureTextEntry={secure}
      style={styles.text}
    />
    {showPass ? (
      <View style={styles.viewInImage}>
        <TouchableOpacity style={styles.touchableButton} onPress={showPassword}>
          <Image source={require('../../assets/img/eye.png')} />
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
);

Input.defaultProps = {
  secure: null,
  showPass: null,
  showPassword: null,
  medium: null,
  onTheChange: null,
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  secure: PropTypes.bool,
  showPass: PropTypes.bool,
  medium: PropTypes.bool,
  showPassword: PropTypes.func,
  onTheChange: PropTypes.func,
};

export default Input;
