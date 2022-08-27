import { Player } from '../../player';

export interface RankingPlayer extends Player {
  scores: number[];
}
