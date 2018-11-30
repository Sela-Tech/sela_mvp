import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DismissKeyboard from '../components/DismissKeyboard';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import IntroHeader from '../components/IntroHeader';
import ExtStyle from '../utils/styles';

import { DEFAULT_COLOUR } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLOUR,
  },
  boldText: {
    color: '#F2994A',
    fontSize: 22,
    fontWeight: '400',
  },
  buttomText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default class ForgotPassword extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    emailOrphone: '',
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <IntroHeader fn={() => goBack()} back />
          <View style={{ alignItems: 'center', marginTop: '10%' }}>
            <Text style={[styles.boldText, ExtStyle.boldText]}>
              {' '}
              Forgot Password
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: '3%' }}>
            <Text style={styles.buttomText}>Enter email address or phone</Text>
            <Text style={styles.buttomText}>number you signed up with to</Text>
            <Text style={styles.buttomText}>got a password reset link</Text>
          </View>
          <View style={{ marginTop: '15%', alignItems: 'center' }}>
            <Input text="Email Address or Phone Number" />
          </View>
          <View style={{ marginTop: '10%', alignItems: 'center' }}>
            <View>
              <Button
                text="Send Reset Link"
                color="#F2994A"
                textColor="#FFFFFF"
                textSize={16}
                medium
              />
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}
