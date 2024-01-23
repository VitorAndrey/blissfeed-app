import axios from 'axios';

import { Article } from '@models/article';
import { AudioContent } from '@models/audioContent';
import { Comment } from '@models/comment';
import { Post } from '@models/post';
import { CreateUser, LoginUser } from '@models/user';
import { VideoContent } from '@models/videoContent';

const BASE_URL = 'https://blissfeed.onrender.com/';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export async function loginUser(data: LoginUser) {
  const response = await axiosInstance.post('sessions', data);

  return response.data;
}
export async function registerUser(data: CreateUser) {
  await axiosInstance.post('users', data);
}

export async function getPosts() {
  return (await axiosInstance.get<Post[]>('posts')).data || [];
}
export async function getUserPosts(user_id: string) {
  return (await axiosInstance.get<Post[]>(`posts/${user_id}`)).data || [];
}
export async function createPost(data: Post) {
  await axiosInstance.post('posts', data);
}

export async function getArticles() {
  return (await axiosInstance.get<Article[]>('articles')).data || [];
}

export async function getAudios() {
  return (await axiosInstance.get<AudioContent[]>('audios')).data || [];
}
export async function getVideos() {
  return (await axiosInstance.get<VideoContent[]>('videos')).data || [];
}

export async function getComments(content_id: string) {
  return (await axiosInstance.get(`comments/${content_id}`)).data || [];
}
export async function createComment(data: Comment) {
  await axiosInstance.post('comments', data);
}

type ConversationType = {
  user_id: string;
  message: string;
};

export async function conversation(data: ConversationType) {
  const response = await axiosInstance.post('conversation', data);

  return response.data;
}
