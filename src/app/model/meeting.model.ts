import { Game, GameLanguage } from './game.model';
import { User } from './user.model';

export interface MeetingItem {
  id: string;
  userId: string;
  guests: User[];
  title: string;
  date: string;
  startHour: string;
  endHour: string;
  city: string;
  address: string;
  isInPublicPlace: boolean;
  game: Game;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  gameLanguage?: GameLanguage;
}
