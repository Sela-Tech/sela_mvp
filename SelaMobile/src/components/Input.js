import React, { Fragment } from 'react';
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
    // color: '#FFFFFF',
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
  sideImageStyle: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
};

const Input = ({
  text,
  secure,
  onTheChange,
  showPassword,
  medium,
  showPass,
  style,
  textStyle,
  placeHolderColor,
  multiline,
  sideImageStatus,
  sideImage,
}) => (
  <View
    style={[
      styles.container,
      { height: medium ? height / 11 : height / 11 },
      style,
    ]}
  >
    <TextInput
      placeholder={text}
      placeholderTextColor={placeHolderColor || '#F5F5F8'}
      onChange={onTheChange}
      secureTextEntry={secure}
      multiline={multiline}
      underlineColorAndroid="rgba(0,0,0,0)"
      spellCheck={false}
      autoCorrect={false}
      blurOnSubmit={false}
      numberOfLines={multiline ? 5 : 1}
      style={[textStyle, styles.text]}
    />
    <Fragment>
      {showPass ? (
        <View style={styles.viewInImage}>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={showPassword}
          >
            <Image source={require('../../assets/img/eye.png')} />
          </TouchableOpacity>
        </View>
      ) : null}
    </Fragment>
    <Fragment>
      {sideImageStatus ? (
        <View style={styles.sideImageStyle}>
          <Image source={sideImage} />
        </View>
      ) : null}
    </Fragment>
  </View>
);

Input.defaultProps = {
  secure: null,
  showPass: null,
  showPassword: null,
  medium: null,
  onTheChange: null,
  style: {},
  multiline: false,
  textStyle: '',
  placeHolderColor: '',
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  placeHolderColor: PropTypes.string,
  secure: PropTypes.bool,
  showPass: PropTypes.bool,
  medium: PropTypes.bool,
  multiline: PropTypes.bool,
  // style: PropTypes.object,
  // textStyle: PropTypes.string,
  showPassword: PropTypes.func,
  onTheChange: PropTypes.func,
};

export default Input;
