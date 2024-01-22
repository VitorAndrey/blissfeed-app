import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Box, Text } from '@theme/index';

type Screen = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

type OnBoardingItemProps = {
  data: Screen;
};

export function OnBoardingItem({ data }: OnBoardingItemProps) {
  const { width } = useWindowDimensions();

  return (
    <Box width={width} flex={1} alignItems="center" justifyContent="center">
      <Image source={data.image} style={styles.image} />

      <Box style={{ width, ...styles.content }}>
        <Text mb="6" textAlign="center" variant="text_xl" style={styles.title}>
          {data.title}
        </Text>
        <Text textAlign="center" variant="text_xs" color="mutedForeground">
          {data.description}
        </Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  content: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: '70%',
    width: '100%',
    maxWidth: 280,
    objectFit: 'contain',
    justifyContent: 'center',
  },
  title: {
    maxWidth: 220,
  },
});
