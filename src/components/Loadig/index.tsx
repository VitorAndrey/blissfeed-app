import { ActivityIndicator } from 'react-native';

import { createBox, useTheme } from '@shopify/restyle';

import { ThemeProps } from '@theme/index';

const Box = createBox<ThemeProps>();

export function Loading() {
  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator color={primary} />
    </Box>
  );
}
