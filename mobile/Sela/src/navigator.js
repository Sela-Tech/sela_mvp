import { createStackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import App from './screens/App';


export const RootNavigator = createStackNavigator({
  Home: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
});
