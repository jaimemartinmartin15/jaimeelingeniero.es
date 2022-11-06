import { GameConfig } from '../game-config';

export const chinchonConfig: GameConfig = {
  name: 'chinchon',
  limitScore: 100,

  sortPlayers: (p1, p2) => {
    return p2.position - p1.position; // TODO sort based on number of rejoin also
  },
};
