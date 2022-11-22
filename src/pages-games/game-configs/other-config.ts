import { Player } from '../interfaces/player';
import { GameConfig } from './game-config';

export const highestScoreSorter = (p1: Player, p2: Player) => p2.totalScore.afterRejoin - p1.totalScore.afterRejoin;
export const lowestScoreSorter = (p1: Player, p2: Player) => p1.totalScore.afterRejoin - p2.totalScore.afterRejoin;

export const otherConfig: GameConfig = {
  name: 'otro',

  sortPlayers: highestScoreSorter,
};
