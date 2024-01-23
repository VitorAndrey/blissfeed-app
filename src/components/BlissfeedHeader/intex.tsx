import React from 'react';

import { Box, Text } from '@theme/index';

export function BlissFeedHeader() {
  return (
    <Box
      py="10"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="2">
      <Box height={28} width={28} borderRadius={'rounded_full'} bg="primary" />
      <Text variant="heading">Blissfeed</Text>
    </Box>
  );
}
