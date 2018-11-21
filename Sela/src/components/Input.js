import React from 'react';
import { View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
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
    },
    viewInImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableButton: {
        position: 'absolute',
        right: 10
    }
};

const Input = ({ text, color, secure, onTheChange }) => (
    <View style={styles.container}>
        <TextInput
            placeholder={text}
            placeholderTextColor="#F5F5F8"
            onChange={onTheChange}
            secureTextEntry={secure}
            style={styles.text}
        />
        {!!secure ?
            <View style={styles.viewInImage}>
                <TouchableOpacity style={styles.touchableButton}>
                    <Image
                        source={require('../../assets/img/eye.png')}
                    />
                </TouchableOpacity>
            </View>
            : null
        }
    </View>
);

Input.propTypes = {
    text: PropTypes.string,
};


export default Input;
