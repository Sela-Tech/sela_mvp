import { createStackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import App from './screens/App';
import Home from './screens/Home';
import IntroScreen from './screens/Intro';


export const RootNavigator = createStackNavigator({
  // Intro: {
  //   screen: IntroScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
});
