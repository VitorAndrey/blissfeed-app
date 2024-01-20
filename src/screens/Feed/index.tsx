import { Text, View } from 'react-native';

import { usePosts, usePostsIds } from '@services/queries';

export function Feed() {
  const postsIds = usePostsIds();
  const posts = usePosts(postsIds.data);

  return (
    <View>
      {posts.map(({ data }) => (
        <Text>{data?.content}</Text>
      ))}
    </View>
  );
}
