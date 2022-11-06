import { allowedQueryParams } from '../allowed-query-params';
import { GameConfig } from './game-config';

export const unoConfig: GameConfig = {
  [allowedQueryParams.GAME_NAME.paramConfig]: 'uno',
  [allowedQueryParams.LIMIT.paramConfig]: 200,

  sortPlayers: (p1, p2) => {
    return p2.totalScore - p1.totalScore;
  },
};
