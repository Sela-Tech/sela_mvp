import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
    container: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

};

const IntroHeader = ({ back }) => (
    <View style={styles.container}>
        <View style={{ marginLeft: '5%' }}>
            {back ? (
                <View>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../assets/img/back.png')}
                    />
                </View>
            ) : null
            }
        </View>
        <View>
            <Image
                style={{ width: 50, height: 50 }}
                source={require('../../assets/img/logo.png')}
            />
        </View>
    </View>
);


export default IntroHeader;
