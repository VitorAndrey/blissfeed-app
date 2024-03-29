import { useCallback, useRef } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Post as PostType } from '@models/post';
import { usePosts } from '@services/queries';

import { Box } from '@theme/index';

import { BlissFeedHeader } from '@components/BlissfeedHeader/intex';
import { Loading } from '@components/Loadig';
import { Post } from '@components/Post';

export function Feed() {
  const { data: posts, isLoading, refetch } = usePosts();
  const flatListRef = useRef<FlatList>(null);

  function scrollToTop() {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Box flex={1}>
      <TouchableOpacity onPress={scrollToTop} activeOpacity={0.8}>
        <BlissFeedHeader />
      </TouchableOpacity>
      {!isLoading ? (
        <FlatList
          ref={flatListRef}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: PostType }) => (
            <Post key={item.id} post={item} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});
