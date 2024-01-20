import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBox, useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';

import { ThemeProps } from '@theme/index';

import { SafeArea } from '@components/SafeArea';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Box = createBox<ThemeProps>();

export function Routes() {
  const isUserLogged = useBoundStore(state => state.isUserLogged);
  const theme = useTheme<ThemeProps>();

  console.log(isUserLogged);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.mainBackground,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Box flex={1} backgroundColor="mainBackground">
        <SafeArea>{isUserLogged ? <AppRoutes /> : <AuthRoutes />}</SafeArea>
      </Box>
    </NavigationContainer>
  );
}
