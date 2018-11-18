import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Spinner = ({ size, color }) => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} color={color || '#FFFFFF'} />
    </View>
);

Spinner.propTypes = {
    size: PropTypes.string,
};


export default Spinner;
