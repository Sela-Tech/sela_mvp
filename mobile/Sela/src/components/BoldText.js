import React, { Component } from 'react';
import { Text } from 'react-native';


const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
export default B;