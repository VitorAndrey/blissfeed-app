import axios from 'axios';

import { Post } from '@models/index';

const BASE_URL = 'http://localhost:3333';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export async function getPostsIds() {
  return (await axiosInstance.get<Post[]>('posts')).data.map(post => post.id);
}

export async function getPost(id: string) {
  return (await axiosInstance.get<Post>(`posts/${id}`)).data;
}

export async function createPost(data: Post) {
  await axiosInstance.post('posts', data);
}
