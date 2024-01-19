import axios from 'axios';

import {Post} from '@/types/post';

const BASE_URL = 'http://localhost:3333';
const axiosInstance = axios.create({baseURL: BASE_URL});

export async function getPosts() {
  return (await axiosInstance.get<Post[]>('posts')).data;
}
