import { ActivityIndicator } from 'react-native';

import { createBox } from '@shopify/restyle';

import { ThemeProps } from '@theme/index';

const Box = createBox<ThemeProps>();

type LoadingProps = {
  color?: string;
};

export function Loading({ color = '#0000cc' }: LoadingProps) {
  return (
    <Box>
      <ActivityIndicator color={color} />
    </Box>
  );
}
