import {useQueries, useQuery} from '@tanstack/react-query';

import {getPost, getPostsIds} from './api';

export function usePostsIds() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getPostsIds,
  });
}

export function usePosts(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map(id => {
      return {
        queryKey: ['post', id],
        queryFn: () => getPost(id!),
      };
    }),
  });
}
