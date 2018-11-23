import React from 'react';
import { Text } from 'react-native';


const B = props => (
  <Text
    onPress={props.fn}
    style={{ fontWeight: 'bold', fontSize: props.size, color: props.color }}
  >
    {props.children}
  </Text>
);
export default B;
