import { createStackNavigator } from 'react-navigation';
import Loading from './components/Loading';
import Login from './screens/Login';
import Home from './screens/Home';
import IntroScreen from './screens/Intro';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import OnBoarding from './screens/OnBoarding';
import SubmitFeedback from './screens/SubmitFeedback';
import CreateProject from './screens/CreateProject';
import ExploreProject from './screens/ExploreProject';

export const RootNavigator = createStackNavigator({
  ExploreProject: {
    screen: ExploreProject,
  },
  Project: {
    screen: CreateProject,
  },
  SubmitFeedback: {
    screen: SubmitFeedback,
    // navigationOptions: {
    //   header: null,
    // },
  },
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
      header: null,
    },
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
