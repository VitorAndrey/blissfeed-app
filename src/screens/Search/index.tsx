import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { Article } from '@models/article';

export function Search() {
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenArticle(article: Article) {
    navigation.navigate('Article', { article });
  }

  return <Text>Search</Text>;
}
