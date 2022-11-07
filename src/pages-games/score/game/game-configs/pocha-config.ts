import { allowedQueryParams } from '../allowed-query-params';
import { GameConfig } from './game-config';

export const pochaConfig: GameConfig = {
  [allowedQueryParams.GAME_NAME.paramConfig]: 'pocha',
  [allowedQueryParams.CARDS_NUMBER.paramConfig]: 40,

  sortPlayers: (p1, p2) => {
    return p1.totalScore - p2.totalScore || p1.maximumAccumulatedScore - p2.maximumAccumulatedScore;
  },
};
