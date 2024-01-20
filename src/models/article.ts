type ArticleCategory = 'Advice' | 'Informative' | 'Curiosity';

export interface Article {
  id: string;
  author_name: string;
  content: string;
  title: string;
  likes: number;
  category: ArticleCategory;
  cover_img: string;
  created_at: Date;
}
