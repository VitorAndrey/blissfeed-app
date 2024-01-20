export interface Comment {
  id: string;
  content: string;
  likes: number;
  author_id: string;
  created_at: Date;
  updated_at: Date;
  post_id: string | null;
  articleId: string | null;
  videoContentId: string | null;
  audioContentId: string | null;
}

export interface CreateComment {
  id?: string | undefined;
  content: string;
  likes: number;
  author_id: string;
  post?: string;
  Article?: string | undefined;
  VideoContent?: string | undefined;
  AudioContent?: string | undefined;
}
