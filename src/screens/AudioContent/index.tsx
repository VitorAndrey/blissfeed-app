import { Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { AppRoutes } from '@routes/app.routes';

type AudioContentScreenRouteProp = RouteProp<AppRoutes, 'AudioContent'>;

interface AudioContent {
  route: AudioContentScreenRouteProp;
}

export function AudioContent({ route }: AudioContent) {
  const { audioContent } = route.params;

  return (
    <View>
      <Text>AudioContent</Text>
    </View>
  );
}
