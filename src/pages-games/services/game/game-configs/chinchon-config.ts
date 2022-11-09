import { allowedQueryParams } from '../allowed-query-params';
import { GameConfig } from './game-config';

export const chinchonConfig: GameConfig = {
  [allowedQueryParams.GAME_NAME.paramConfig]: 'chinchon',
  [allowedQueryParams.LIMIT.paramConfig]: 100,

  sortPlayers: (p1, p2) => {
    return p1.totalScore.afterRejoin - p2.totalScore.afterRejoin || p1.rejoins.length - p2.rejoins.length;
  },
};
