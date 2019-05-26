import { Film } from './film';

export interface FilmResponse {
  Search: Film[];
  totalResults: number;
  Response: boolean;
}
