import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { AudioContent } from '@models/audioContent';
import { VideoContent } from '@models/videoContent';
import { useAudios, useVideos } from '@services/queries';

import { Box, Text, ThemeProps } from '@theme/index';

import { Audio } from '@components/Audio';
import { BlissFeedHeader } from '@components/BlissfeedHeader/intex';
import { Loading } from '@components/Loadig';
import { Video } from '@components/Video';

const renderScene = SceneMap({
  first: Videos,
  second: Audios,
});

export function Relaxing() {
  const layout = useWindowDimensions();
  const theme = useTheme<ThemeProps>();
  const { mainForeground, mutedForeground, primary } = theme.colors;

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

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={mainForeground}
      inactiveColor={mutedForeground}
      indicatorStyle={{ backgroundColor: primary }}
      {...props}
      renderLabel={({ route, color }) => (
        <Text style={{ color, fontFamily: 'Inter-Bold' }}>{route.title}</Text>
      )}
      style={{
        backgroundColor: 0,
        borderColor: primary,
        elevation: 0,
      }}
    />
  );

  return (
    <Box flex={1}>
      <BlissFeedHeader />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </Box>
  );
}

function Videos() {
  const { data: videos } = useVideos();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const relaxationVideos = videos?.filter(
    video => video.category === 'Relaxing',
  );
  const focusVideos = videos?.filter(video => video.category === 'Focus');
  const entertainmentVideos = videos?.filter(
    video => video.category === 'Enterteniment',
  );

  function handleOpenVideo(video: VideoContent) {
    navigation.navigate('VideoContent', { video });
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Text px="6" pt="10" py="2" variant="text_xl" fontFamily="Inter-Bold">
        Relaxamento
      </Text>
      {!relaxationVideos || relaxationVideos.length < 1 ? (
        <Box height={140}>
          <Loading />
        </Box>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={relaxationVideos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenVideo(item)}>
              <Video video={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}

      <Text px="6" py="2" variant="text_xl" fontFamily="Inter-Bold">
        Foco
      </Text>
      {!relaxationVideos || relaxationVideos.length < 1 ? (
        <Box height={140}>
          <Loading />
        </Box>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={focusVideos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenVideo(item)}>
              <Video video={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}

      <Text px="6" py="2" variant="text_xl" fontFamily="Inter-Bold">
        Entretenimento
      </Text>
      {!relaxationVideos || relaxationVideos.length < 1 ? (
        <Box height={140}>
          <Loading />
        </Box>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={entertainmentVideos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenVideo(item)}>
              <Video video={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </ScrollView>
  );
}

function Audios() {
  const { data: audios } = useAudios();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenAudio(audio: AudioContent) {
    navigation.navigate('AudioContent', { audio });
  }

  if (!audios || audios.length < 1) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text color="mutedForeground">Sem Audios no momento.</Text>
      </Box>
    );
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
    gap: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
});
