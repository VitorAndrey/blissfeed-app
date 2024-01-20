type AudioContentCategory = 'Focus' | '  Relaxing' | 'Enterteniment';

export interface AudioContent {
  id: string;
  category: AudioContentCategory;
  audio_url: string;
  cover_img: string;
  likes: number;
}
