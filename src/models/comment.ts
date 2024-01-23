export interface Comment {
  id: string;
  content: string;
  likes: number;
  author_id: string;
  author?: {
    name: string;
    profile_img?: string;
  };
  created_at: Date;
  updated_at: Date;
  post_id?: string | null;
  articleId?: string | null;
  videoContentId?: string | null;
  audioContentId?: string | null;
}

export interface CreateComment {
  user_id: string;
  content_id: string;
  content: string;
  content_type: 'post' | 'article' | 'video_content' | 'audio_content';
}
