import React, { Component } from 'react';
import { Text } from 'react-native';


const B = props => (
  <Text style={{ fontWeight: 'bold', fontSize: props.size, color: props.color }}>
      {' '}
      {props.children}
    </Text>
);
export default B;
