import { Player } from '../player/player';

export interface NextRoundPopUpInput {
  round: number;
  players: Player[];
}

export type NextRoundPopUpOutput = NextRoundPopUpInput;
