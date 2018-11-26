import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'proximaNova',
  },
});

const TextN = props => (
  <Text
      onPress={props.onPress}
      style={[styles.text, props.style]}
    >
      {props.children}
    </Text>
);
export default TextN;
