import { Player } from '../player/player';

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
   * When a player reaches this limit, rejoins or is eliminated...
   */
  limitScore?: number;
}

export type GameConfigTranslatableKeys = keyof Pick<GameConfig, 'name' | 'limitScore'>;
