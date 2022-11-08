import { Player } from '../../services/player/player';

export interface NextRoundPopUpInput {
  round: number;
  players: Pick<Player, 'id' | 'name' | 'punctuation'>[];
}

export type NextRoundPopUpOutput = NextRoundPopUpInput;
