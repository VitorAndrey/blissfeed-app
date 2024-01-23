type VideoContentCategory = 'Focus' | 'Relaxing' | 'Enterteniment';

export interface VideoContent {
  id: string;
  category: VideoContentCategory;
  video_url: string;
  title: string;
  description: string;
  cover_img: string;
  likes: number;
}
