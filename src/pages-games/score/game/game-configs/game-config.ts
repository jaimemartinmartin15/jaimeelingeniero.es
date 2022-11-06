import { Player } from '../../player/player';
import { allowedQueryParams } from '../allowed-query-params';

export interface GameConfig {
  /**
   * Name of the game
   */
  [allowedQueryParams.GAME_NAME.paramConfig]: string;

  /**
   * Returns how the list of players should be shown in the ranking
   */
  sortPlayers: (p1: Player, p2: Player) => number;

  /**
   * When a player reaches this limit, rejoins or is eliminated...
   */
  [allowedQueryParams.LIMIT.paramConfig]?: number;
}
