import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { useNavigation } from '@react-navigation/native';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { AudioContent } from '@models/audioContent';
import { VideoContent } from '@models/videoContent';
import { useAudios, useVideos } from '@services/queries';

import { Box } from '@theme/index';

import { Audio } from '@components/Audio';
import { BlissFeedHeader } from '@components/BlissfeedHeader/intex';
import { Video } from '@components/Video';

const renderScene = SceneMap({
  first: Videos,
  second: Audios,
});

export function Relaxing() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Videos',
    },
    {
      key: 'second',
      title: 'Audios',
    },
  ]);

  return (
    <Box flex={1}>
      <BlissFeedHeader />

      <TabView
        style={{
          backgroundColor: 'red',
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Box>
  );
}

function Videos() {
  const { data: videos } = useVideos();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenVideo(video: VideoContent) {
    navigation.navigate('VideoContent', { video });
  }

  return (
    <Box flex={1}>
      <FlatList
        data={videos}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenVideo(item)}>
            <Video video={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Box>
  );
}

function Audios() {
  const { data: audios } = useAudios();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenAudio(audio: AudioContent) {
    navigation.navigate('AudioContent', { audio });
  }

  return (
    <Box flex={1}>
      <FlatList
        data={audios}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenAudio(item)}>
            <Audio audio={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
