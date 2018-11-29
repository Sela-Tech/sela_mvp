import React from 'react';
import { Font } from 'expo';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import { RootNavigator } from './src/Navigator';
import ErrorHandler from './src/components/ErrorHandler';
import NavigationService from './src/services/NavigationService';
import { WHITE } from './src/utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      proximaNova: require('./assets/fonts/proximaNova.ttf'),
    });
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return <SplashScreen />;
    }
    return (
      <ErrorHandler>
        <View style={styles.container}>
          <RootNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </ErrorHandler>
    );
  }
}
