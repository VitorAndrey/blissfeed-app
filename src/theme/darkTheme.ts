import { theme } from '.';
import { palette } from './colors';

export function createDarkTheme() {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: palette.purpleLight,
      secondary: palette.purpleDark,
      mainBackground: palette.black,
      mainForeground: palette.white,
      tabBarActiveTintColor: palette.gray_50,
      tabBarInactiveTintColor: palette.gray_700,
      success: palette.greenLight,
      danger: palette.redLight,
    },
  };
}
