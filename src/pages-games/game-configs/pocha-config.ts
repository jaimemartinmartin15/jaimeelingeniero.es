import { GameConfig } from './game-config';

export const pochaConfig: GameConfig = {
  name: 'pocha',
  cardsNumber: 40,

  sortPlayers: (p1, p2) => {
    return p2.totalScore.afterRejoin - p1.totalScore.afterRejoin || p2.maximumAccumulatedScore - p1.maximumAccumulatedScore;
  },
};
