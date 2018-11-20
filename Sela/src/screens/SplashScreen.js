import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from '../components/Spinner';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7823F',
    },
});


export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={require('../../assets/img/logo.png')}
                />
            </View>
        );
    }
}


