import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Login } from '@screens/Login';
import { Register } from '@screens/Register';
import { Welcome } from '@screens/Welcome';

export type AuthRoutes = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthNavigationRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
