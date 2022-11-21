import { allowedQueryParams } from '../allowed-query-params';
import { GameConfig } from './game-config';

export const otherConfig: GameConfig = {
  [allowedQueryParams.GAME_NAME.paramConfig]: 'otro',

  sortPlayers: (p1, p2) => p2.totalScore.afterRejoin - p1.totalScore.afterRejoin,
};
