import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { RootNavigator } from './src/Navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}
