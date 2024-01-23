import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { VideoContent as VideoContentType } from '@models/videoContent';

import { X } from 'lucide-react-native';

import { Box, ThemeProps } from '@theme/index';

import { CommentSection } from '@components/CommentSection';
import { Loading } from '@components/Loadig';

interface VideoContentProps {
  route: {
    params: {
      video: VideoContentType;
    };
  };
}

export function VideoContent({ route }: VideoContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme<ThemeProps>();
  const { mainForeground } = theme.colors;

  const { video } = route.params;
  const { width } = useWindowDimensions();
  const videoId = getVideoId(video.video_url);

  function getVideoId(url: string) {
    const shortsRegex = /\/shorts\/([^\?\/]+)/;
    const watchRegex = /[?&]v=([^&]+)/;

    const shortsMatch = url.match(shortsRegex);
    if (shortsMatch && shortsMatch[1]) {
      return shortsMatch[1];
    }

    const watchMatch = url.match(watchRegex);
    if (watchMatch && watchMatch[1]) {
      return watchMatch[1];
    }

    return null;
  }

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Box
        flexDirection="row"
        alignItems="center"
        gap="3"
        px="4"
        py="3"
        bg="bgInput">
        <TouchableOpacity style={styles.icon_btn} onPress={handleGoBack}>
          <X color={mainForeground} size={22} />
        </TouchableOpacity>
      </Box>

      {/* Player de Vídeo do YouTube */}
      <View style={styles.player}>
        <YoutubePlayer
          height={200}
          width={width}
          videoId={videoId || undefined}
          onReady={() => setIsLoading(false)}
        />

        {isLoading && <Loading />}
      </View>

      {/* Título */}
      <Text style={styles.title}>{video.title}</Text>

      {/* Descrição */}
      <Text style={styles.description}>{video.description}</Text>

      <Box pt="10">
        <CommentSection
          contentId={video.id}
          type="video_content"
          initialOpen
          toggable={false}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  player: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    margin: 10,
  },
  learnMoreButton: {
    margin: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  learnMoreText: {
    color: 'white',
  },
  icon_btn: {
    padding: 10,
  },
});
