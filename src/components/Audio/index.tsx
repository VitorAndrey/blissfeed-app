import React from 'react';

import { AudioContent } from '@models/audioContent';

import { Box, Text } from '@theme/index';

export function Audio({ audio }: { audio: AudioContent }) {
  return (
    <Box>
      <Text>{audio.category}</Text>
    </Box>
  );
}
