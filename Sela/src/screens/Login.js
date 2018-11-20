import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import Input from '../components/Input';
import Button from '../components/Button';
import B from '../components/BoldText';
import { DEFAULT_COLOUR } from '../utils/constants';



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
        color: '#FFFFFF',
        fontSize: 15,
    },
});

export default class Login extends Component {

    render() {
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={{ marginTop: '20%' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/img/logo.png')}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: '15%' }}>
                        <Text style={styles.boldText}> Log In</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: '3%' }}>
                        <Text style={styles.buttomText}>Welcome back ! Enter your details </Text>
                        <Text style={styles.buttomText}>below to log into your account </Text>
                    </View>
                    <View style={{ marginTop: '15%' }}>
                        <Input
                            text="Email Address or Phone Number"
                        />
                        <View style={{ marginTop: 10 }}>
                            <Input
                                text="Password"
                                secure={true}
                            />
                        </View>
                        <View style={{
                            marginTop: '5%',
                            alignSelf: 'flex-end',
                        }}>
                            <Text style={styles.buttomText}>  Forgot password?</Text>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <Button
                                text='Log In'
                                color='#F2994A'
                                textColor='#FFFFFF'
                            />
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 40,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.buttomText}> Don't have an account? <B>Get Started </B>  </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </DismissKeyboard>
        );
    }
};
