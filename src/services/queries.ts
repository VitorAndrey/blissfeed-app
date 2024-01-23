import { useQuery } from '@tanstack/react-query';

import {
  getArticles,
  getAudios,
  getPosts,
  getUserPosts,
  getVideos,
} from './api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
}

export function useUserPosts(user_id: string) {
  return useQuery({
    queryKey: ['user_posts', user_id],
    queryFn: () => getUserPosts(user_id),
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });
}

export function useVideos() {
  return useQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
  });
}

export function useAudios() {
  return useQuery({
    queryKey: ['audios'],
    queryFn: getAudios,
  });
}
