import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import IntroComp from '../components/Intro/Intro';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default () => (
    <Swiper style={styles.wrapper} showsButtons={true} >

        <IntroComp
            image={require('../../assets/img/building.png')}
            shortText="Fund"
            longText="Find, fund and track development"
        />

        <IntroComp
            image={require('../../assets/img/man.png')}
            shortText="Execute"
            longText="propose and execute development"
        />


        <IntroComp
            image={require('../../assets/img/woman.png')}
            shortText="Evaluate"
            longText="Provide progress updates on"
        />
    </Swiper>
)
