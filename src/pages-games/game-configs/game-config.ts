import { Player } from '../interfaces/player';

export interface GameConfig {
  /**
   * Name of the game
   */
  name: string;

  /**
   * Returns how the list of players should be shown in the ranking
   */
  sortPlayers: (p1: Player, p2: Player) => number;

  /**
   * When a player exceeds this limit, rejoins
   */
  limitScore?: number;

  /**
   * Number of cards used in the game
   */
  cardsNumber?: number;
}
