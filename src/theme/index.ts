import { createTheme } from '@shopify/restyle';

import { palette } from './pallete';
import { spacing } from './spacing';
import { textVariants } from './textVariants';

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    tabBarActiveTintColor: palette.gray_800,
    tabBarInactiveTintColor: palette.gray_300,
  },
  spacing,
  textVariants,
});

const darkTheme: ThemeProps = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    tabBarActiveTintColor: palette.gray_50,
    tabBarInactiveTintColor: palette.gray_700,
  },
};

export type ThemeProps = typeof theme;
export { darkTheme, theme };
