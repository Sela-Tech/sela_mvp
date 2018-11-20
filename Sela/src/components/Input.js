import React from 'react';
import { View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
    container: {
        height: height / 14,
        width: width / 1.3,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#F5F5F8',
        borderWidth: 1,
        marginleft: 14,
        flexDirection: 'row',
    },
    text: {
        color: '#FFFFFF',
        marginLeft: 15
    }
};

const Input = ({ text, color, secure, onTheChange }) => (
    <View style={styles.container}>
        <View>
            <TextInput
                placeholder={text}
                onChange={onTheChange}
                secureTextEntry={secure}
                style={styles.text}
            />
        </View>
        {!!secure ?
            <View style={{ position: 'absolute', right: 10 }}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/img/eye.png')}
                    />
                </TouchableOpacity>
            </View> :
            null
        }
    </View>
);

Input.propTypes = {
    text: PropTypes.string,
};


export default Input;
