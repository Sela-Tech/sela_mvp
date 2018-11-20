import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
    container: {

    },

};

const IntroHeader = () => (
    <View style={{ marginTop: '20%' }}>
        <Image
            style={{ width: 50, height: 50 }}
            source={require('../../assets/img/logo.png')}
        />
    </View>
);


export default IntroHeader;
