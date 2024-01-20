import { Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { AppRoutes } from '@routes/app.routes';

type VideoContentScreenRouteProp = RouteProp<AppRoutes, 'VideoContent'>;

interface VideoContent {
  route: VideoContentScreenRouteProp;
}

export function VideoContent({ route }: VideoContent) {
  const { videoContent } = route.params;

  return (
    <View>
      <Text>VideoContent</Text>
    </View>
  );
}
