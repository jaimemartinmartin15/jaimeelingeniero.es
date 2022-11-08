import { Player } from '../../../services/player/player';
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

  /**
   * Number of cards used in the game
   */
  [allowedQueryParams.CARDS_NUMBER.paramConfig]?: number;
}
