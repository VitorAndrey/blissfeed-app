import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';

export function Routes() {
  const isUserLogged = true;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <>{isUserLogged ? <AppRoutes /> : <AuthRoutes />}</>
    </NavigationContainer>
  );
}
