import { createBox, createText, createTheme } from '@shopify/restyle';

import { borderRadii } from './borderRadius';
import { colors, palette } from './colors';
import { spacing } from './spacing';
import { textVariants } from './textVariants';

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  borderRadii,
});

const darkTheme: ThemeProps = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: palette.orangeLight,
    secondary: palette.orangeDark,

    mainBackground: palette.black,

    mainForeground: palette.white,
    secondaryForeground: palette.black,
    mutedForeground: palette.gray_500,

    tabBarActiveTintColor: palette.gray_50,
    tabBarInactiveTintColor: palette.gray_700,

    success: palette.greenLight,
    danger: palette.redLight,

    bgInput: palette.gray_800,
  },
};

export type ThemeProps = typeof theme;
export const Box = createBox<ThemeProps>();
export const Text = createText<ThemeProps>();

export { darkTheme, theme };
