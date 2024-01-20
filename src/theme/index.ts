import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  gray_50: '#f1f1ef',
  gray_100: '#dad9d6',
  gray_200: '#c3c1bc',
  gray_300: '#aba9a2',
  gray_400: '#949189',
  gray_500: '#7c7970',
  gray_600: '#626059',
  gray_700: '#484741',
  gray_800: '#2f2e2a',
  gray_900: '#151413',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
    tabBarActiveTintColor: palette.gray_800,
    tabBarInactiveTintColor: palette.gray_300,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'mainForeground',
    },
    subheader: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: '600',
      fontSize: 22,
      lineHeight: 30,
      color: 'mainForeground',
    },
    defaults: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'mainForeground',
    },
  },
});

export type ThemeProps = typeof theme;

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

export { darkTheme, theme };
