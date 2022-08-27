import { RoundPlayer } from './round-player';

export interface NextRoundPopUpInput {
  round: number;
  players: RoundPlayer[];
}

export type NextRoundPopUpOutput = NextRoundPopUpInput;
