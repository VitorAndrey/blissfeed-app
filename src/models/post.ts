export interface Post {
  id: string;
  content: string;
  likes: number;
  author_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePost {
  id?: string | undefined;
  content: string;
  likes: number;
  author: string;
}
