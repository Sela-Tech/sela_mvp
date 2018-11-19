import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


const { height } = Dimensions.get('window');
const style = StyleSheet.create({
    innerContainer: {
        flex: 1,
        alignItems: 'center'
    }
});

const Intro = ({ image, shortText, longText }) => (
    <View style={{ flex: 1 }}>
        <View>
            <Image source={image}
                resizeMode='cover'
                style={{ height: height / 1.5 }}
            />
        </View>
        <View style={style.innerContainer}>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }} > {shortText} </Text>
            </View>

            <View style={{ marginTop: 40 }}>
                <Text> {longText} </Text>
            </View>
        </View>
    </View>
)
Intro.propTypes = {
    shortText: PropTypes.string,
    longText: PropTypes.string,
};


export default Intro;
