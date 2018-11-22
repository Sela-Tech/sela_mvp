import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
    ButtonStyle: {
        justifyContent: 'center',
        width: width / 1.3,
        borderRadius: 5,
        alignItems: 'center',
    },
};

const Button = ({
    text, color, textColor, fn, textSize, medium,
}) => (
        <TouchableOpacity
            onPress={fn}
            style={[styles.ButtonStyle, { height: medium ? height / 12 : height / 14, backgroundColor: color }]}
        >
            <Text style={{ color: textColor, fontSize: textSize }}>
                {' '}
                {text}
                {' '}
            </Text>
        </TouchableOpacity>
    );

Button.propTypes = {
    text: PropTypes.string.isRequired,
    fn: PropTypes.func,
};


export default Button;
