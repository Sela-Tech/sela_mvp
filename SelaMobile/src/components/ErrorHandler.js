import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, info, error });
    console.log('error', error);
    console.log('info', info);
    // You can also log the error to an error reporting service
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <ImageBackground
          source={require('../../assets/splash.png')}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      );
    }
    return children;
  }
}
