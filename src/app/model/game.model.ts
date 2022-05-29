export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
}

export enum GameLanguage {
  ENGLISH = 'angielski',
  POLISH = 'polski',
  OTHER = 'obcy',
}