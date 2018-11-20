import { createStackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Home from './screens/Home';
import IntroScreen from './screens/Intro';


export const RootNavigator = createStackNavigator({
  // Intro: {
  //   screen: IntroScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // Home: {
  //   screen: Home,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});
