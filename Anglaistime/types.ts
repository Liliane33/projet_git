export enum AppScreen {
  HOME = 'HOME',
  LESSONS = 'LESSONS',
  SONGS = 'SONGS',
  AI_BUDDY = 'AI_BUDDY',
  PARENTS = 'PARENTS',
}

export interface Lesson {
  id: string;
  title: string;
  icon: string; // Emoji or URL
  color: string;
  vocab: { word: string; translation: string; emoji: string }[];
}

export interface Song {
  id: string;
  title: string;
  duration: string;
  color: string;
}

export interface LiveConnectionState {
  isConnected: boolean;
  isSpeaking: boolean; // Is the AI speaking?
  isListening: boolean; // Is the user mic active?
  error: string | null;
}
