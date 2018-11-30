import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'proximaNova',
  },
});

const TextN = ({ onPress, style, children }) => (
  <Text onPress={onPress} style={[styles.text, style]}>
    {children}
  </Text>
);
export default TextN;
