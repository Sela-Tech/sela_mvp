import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootNavigator } from './src/Navigator';
import NavigationService from './src/services/NavigationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => (
  <View style={styles.container}>
    <RootNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  </View>
);
