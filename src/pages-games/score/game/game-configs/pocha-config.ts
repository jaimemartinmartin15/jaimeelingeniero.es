import { GameConfig } from '../game-config';

export const pochaConfig: GameConfig = {
  name: 'pocha',

  sortPlayers: (p1, p2) => {
    return p1.position - p2.position || p1.maximumAccumulatedScore - p2.maximumAccumulatedScore;
  },
};
