import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { navigation } from 'react-navigation';
import { DEFAULT_COLOUR } from '../utils/constants';
import B from '../components/BoldText';
import Button from '../components/Button';
import IntroHeader from '../components/IntroHeader';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: DEFAULT_COLOUR,
    },
    boldText: {
        color: '#F2994A',
        fontSize: 22,
        fontWeight: '400'
    },
    buttomText: {
        color: '#FFFFFF'
    },
});

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <IntroHeader />
                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <Text style={styles.boldText}> How would you like to</Text>
                    <Text style={styles.boldText} > Proceed </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: '3%' }}>
                    <Text style={styles.buttomText}>Select <B>Get Started</B> if this is your first </Text>
                    <Text style={styles.buttomText}>time or  <B>Log in</B> if you already have an </Text>
                    <Text style={styles.buttomText}>account.You can also <B>Explore Projects</B></Text>
                    <Text style={styles.buttomText}> right away </Text>
                </View>
                <View style={{ marginTop: '15%' }}>
                    <View>
                        <Button
                            text='Get Started'
                            color='#F2994A'
                        />
                    </View>
                    <View style={{ marginTop: '5%' }}>
                        <Button
                            text='Log In'
                            color='#FFFFFF'
                            fn={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 40,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: '#FFFFFF' }}> Explore Projects </Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/img/forward.png')}
                                style={{ height: 10, width: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

