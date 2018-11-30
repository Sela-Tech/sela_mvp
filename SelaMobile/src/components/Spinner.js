import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Spinner = ({ size, color, occupy }) => (
  <View style={(styles.spinnerStyle, occupy ? { flex: 1 } : null)}>
    <ActivityIndicator size={size || 'large'} color={color || '#FFFFFF'} />
  </View>
);

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  occupy: PropTypes.bool,
};

export default Spinner;
