import { createStackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import App from './screens/App';
import IntroScreen from './screens/Intro';


export const RootNavigator = createStackNavigator({
  // Home: {
  //     screen: SplashScreen,
  //     navigationOptions: {
  //         header: null,
  //     },
  // },
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
    },
  },
});
