import React from 'react';
import { Image } from 'react-native';

import { Box, Text } from '@theme/index';
const image = require('../../assets/images/blissfeed.png');

export function BlissFeedHeader() {
  return (
    <Box
      py="10"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="1">
      <Image source={image} style={{ width: 35, height: 35 }} />
      <Text variant="heading">Blissfeed</Text>
    </Box>
  );
}
