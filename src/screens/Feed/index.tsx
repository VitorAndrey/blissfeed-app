import { View } from 'react-native';

import { createText } from '@shopify/restyle';

// import { usePosts, usePostsIds } from '@services/queries';
import { ThemeProps } from '@theme/index';

const Text = createText<ThemeProps>();

export function Feed() {
  // const postsIds = usePostsIds();
  // const posts = usePosts(postsIds.data);

  return (
    <View>
      {/* {posts.map(({ data }) => (
        <Text>{data?.content}</Text>
      ))} */}

      <Text>Hello World</Text>
    </View>
  );
}
