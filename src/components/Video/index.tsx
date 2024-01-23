import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { VideoContent } from '@models/videoContent';

import { PlayIcon } from 'lucide-react-native';

import { Box, Text } from '@theme/index';

export function Video({ video }: { video: VideoContent }) {
  return (
    <Box width={140} height={110} gap="2">
      <Box style={styles.video_container}>
        <ImageBackground style={styles.image} source={{ uri: video.cover_img }}>
          <View style={styles.overlay}>
            <PlayIcon color="white" fill="white" />
          </View>
        </ImageBackground>
      </Box>
      <Text px="2" variant="text_xs" color="mutedForeground" numberOfLines={1}>
        {video.title}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video_container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 15,
  },
});
