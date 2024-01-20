import { Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { AppRoutes } from '@routes/app.routes';

type ArticleScreenRouteProp = RouteProp<AppRoutes, 'Article'>;

interface ArticleProps {
  route: ArticleScreenRouteProp;
}

export function Article({ route }: ArticleProps) {
  const { article } = route.params;

  return (
    <View>
      <Text>Article</Text>
    </View>
  );
}
