import axios from 'axios';

import { Post } from '@models/post';
import { CreateUser, LoginUser, User } from '@models/user';

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

export async function loginUser(data: LoginUser) {
  const response = await axiosInstance.post<User>('sessions', data);

  return response.data;
}

export async function registerUser(data: CreateUser) {
  await axiosInstance.post('users', data);
}
