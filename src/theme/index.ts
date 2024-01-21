import { createBox, createText, createTheme } from '@shopify/restyle';

import { borderRadii } from './borderRadius';
import { buttonVariants } from './buttonVariants';
import { colors } from './colors';
import { createDarkTheme } from './darkTheme';
import { spacing } from './spacing';
import { textVariants } from './textVariants';

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants,
  borderRadii,
});

const darkTheme: ThemeProps = createDarkTheme();

export type ThemeProps = typeof theme;
export const Box = createBox<ThemeProps>();
export const Text = createText<ThemeProps>();

export { darkTheme, theme };
