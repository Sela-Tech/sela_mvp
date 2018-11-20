import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
    ButtonStyle: {
        justifyContent: 'center',
        height: height / 14,
        width: width / 1.3,
        borderRadius: 5,
        alignItems: 'center',
    },
};

const Button = ({ text, color, textColor, fn }) => (
    <TouchableOpacity
        onPress={fn}
        style={[styles.ButtonStyle, { backgroundColor: color }]} >
        <Text style={{ color: textColor }}> {text} </Text>
    </TouchableOpacity>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    fn: PropTypes.func
};


export default Button;
