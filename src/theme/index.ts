import { createTheme } from '@shopify/restyle';

import { buttonVariants } from './buttonVariants';
import { palette } from './pallete';
import { spacing } from './spacing';
import { textVariants } from './textVariants';

const theme = createTheme({
  colors: {
    primary: palette.purpleDark,
    secondary: palette.purpleLight,
    mainBackground: palette.white,
    mainForeground: palette.black,
    tabBarActiveTintColor: palette.gray_800,
    tabBarInactiveTintColor: palette.gray_300,
    success: palette.greenLight,
    danger: palette.redLight,
  },
  spacing,
  textVariants,
  buttonVariants,
});

const darkTheme: ThemeProps = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    tabBarActiveTintColor: palette.gray_50,
    tabBarInactiveTintColor: palette.gray_700,
    primary: palette.purpleLight,
    success: palette.greenDark,
    danger: palette.redDark,
  },
};

export type ThemeProps = typeof theme;
export { darkTheme, theme };
