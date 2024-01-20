type VideoContentCategory = 'Focus' | 'Relaxing' | 'Enterteniment';

export interface VideoContent {
  id: string;
  category: VideoContentCategory;
  audio_url: string;
  cover_img: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}
