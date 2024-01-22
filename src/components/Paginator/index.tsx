import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { Box, ThemeProps } from '@theme/index';

type PaginatorProps = {
  data: { id: string; title: string; description: string; image: string }[];
  scrollX: Animated.Value;
};

export function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;

  return (
    <Box
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="2">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotSize = scrollX.interpolate({
          inputRange,
          outputRange: [10, 12, 10],

          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],

          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={{
              opacity,
              width: dotSize,
              height: dotSize,
              backgroundColor: primary,
              ...styles.dot,
            }}
          />
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 999,
  },
});
