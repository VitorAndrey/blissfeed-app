import { Text } from 'react-native';

import { useAudios, useVideos } from '@services/queries';

export function Relaxing() {
  const { data: videos } = useVideos();
  const { data: audios } = useAudios();

  return <Text>Relaxing</Text>;
}
