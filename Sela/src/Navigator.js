import { createStackNavigator } from 'react-navigation';

import Loading from './components/Loading';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Home from './screens/Home';
import IntroScreen from './screens/Intro';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import OnBoarding from './screens/OnBoarding';


export const RootNavigator = createStackNavigator({
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null,
    },
  },
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      header: null
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    },
  },

});
