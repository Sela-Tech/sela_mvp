import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';


const { height } = Dimensions.get('window');
const style = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Intro = ({ image, shortText, longText }) => (
    <View style={{ flex: 1 }}>
        <View>
            <Image source={image}
                style={{ height: height / 1.5 }} />
        </View>
        <View style={style.innerContainer}>
            <View>
                <Text> {shortText} </Text>
            </View>

            <View>
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
