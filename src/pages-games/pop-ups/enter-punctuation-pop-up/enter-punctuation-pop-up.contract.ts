import { Player } from '../../interfaces/player';

export interface EnterPunctuationPopUpInput {
  round: number;
  players: Pick<Player, 'id' | 'name' | 'punctuation'>[];
}

export type EnterPunctuationPopUpOutput = EnterPunctuationPopUpInput;
