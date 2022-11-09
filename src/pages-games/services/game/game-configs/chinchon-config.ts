import { allowedQueryParams } from '../allowed-query-params';
import { GameConfig } from './game-config';

export const chinchonConfig: GameConfig = {
  [allowedQueryParams.GAME_NAME.paramConfig]: 'chinchon',
  [allowedQueryParams.LIMIT.paramConfig]: 100,

  sortPlayers: (p1, p2) => {
    return p1.totalScore - p2.totalScore; // TODO sort based on number of rejoins also
  },
};