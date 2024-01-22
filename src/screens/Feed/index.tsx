import { useCallback, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { Post } from '@models/post';

import { Box, Text } from '@theme/index';

import { Loading } from '@components/Loadig';

export function Feed() {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);

  const data: Post[] = [
    {
      id: '123',
      author_id: '123',
      content: 'Bom Dia',
      created_at: new Date(),
      likes: 23,
      updated_at: new Date(),
    },
  ];
  const isLoading = false;

  // function scrollToTop() {
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  //   }
  // }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Box flex={1}>
      {!isLoading ? (
        <FlatList
          ref={flatListRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 20,
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
}
