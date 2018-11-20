import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image,
} from 'react-native';
import { DEFAULT_COLOUR } from '../utils/constants';
import B from '../components/BoldText';
import Input from '../components/Input';
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
    fontWeight: '400',
  },
  buttomText: {
    color: '#FFFFFF',
  },
});

export default class ForgotPassword extends Component {
  render() {
    return (
          <View style={styles.container}>
              <IntroHeader />
              <View style={{ alignItems: 'center', marginTop: '10%' }}>
                  <Text style={styles.boldText}> Forgot Password</Text>
                </View>
              <View style={{ alignItems: 'center', marginTop: '3%' }}>
                  <Text style={styles.buttomText}>
                        Create your new password
                    </Text>
                  <Text style={styles.buttomText}>
                        below to proceed
                    </Text>
                  <Text style={styles.buttomText}>
                        got a password reset link
                    </Text>

                </View>
              <View style={{ marginTop: '15%' }}>
                  <Input
                      text=" New Password"
                      secure
                    />
                </View>
              <View style={{ marginTop: '10%' }}>
                  <View>
                      <Button
                          text="Send Reset Link"
                          color="#F2994A"
                          textColor="#FFFFFF"
                          textSize={16}
                        />
                    </View>
                </View>
            </View>
    );
  }
}
