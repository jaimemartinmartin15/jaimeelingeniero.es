import { GameConfig } from './game-config';

export const otherConfig: GameConfig = {
  name: 'otro',

  sortPlayers: (p1, p2) => p2.totalScore.afterRejoin - p1.totalScore.afterRejoin,
};
