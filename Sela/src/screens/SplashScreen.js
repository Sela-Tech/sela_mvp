import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7823F',
  },
});

export default () => (
  <View style={styles.container}>
    <Image source={require('../../assets/img/logo.png')} />
  </View>
);
