import { Player } from '../player';

export interface GameService {
  readonly gameName: string;

  get players(): Player[];
  set players(value: Player[]);
  playerStartsDealing: number;

  numberOfCards: number;
  limitScore: number;
  winner: 'highestScore' | 'lowestScore';

  readonly showNumberOfCardsConfig: boolean;
  readonly showLimitScoreConfig: boolean;
  readonly showWinnerConfig: boolean;
}
