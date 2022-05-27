export interface Game {
  title: string;
  thumbnail: string;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
}

export enum GameLanguage {
  ENGLISH = 'angielski',
  POLISH = 'polski',
  OTHER = 'obcy',
}