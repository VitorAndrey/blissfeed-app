import { useMutation } from '@tanstack/react-query';

import { Post } from '@models/index';

import { createPost } from './api';

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: Post) => createPost(data),
    onMutate: () => {
      console.log('mutate');
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');
    },
    onSettled: () => {
      console.log('settled');
    },
  });
}
