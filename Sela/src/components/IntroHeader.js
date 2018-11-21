import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ExtStyle from '../utils/styles';

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
        <View style={{ marginLeft: !back ? null : '13%', flex: 1 }}>
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
        <View style={[ExtStyle.flex1, !back ? { alignItems: 'center' } : null]}>
            <Image
                style={{ width: 50, height: 50 }}
                source={require('../../assets/img/logo.png')}
            />
        </View>
        <View style={ExtStyle.flex1} />
    </View>
);


export default IntroHeader;
