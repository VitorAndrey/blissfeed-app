import React from 'react';

import { VideoContent } from '@models/videoContent';

import { Box, Text } from '@theme/index';

export function Video({ video }: { video: VideoContent }) {
  return (
    <Box>
      <Text>{video.category}</Text>
    </Box>
  );
}
