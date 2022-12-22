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

  readonly showGameNameInfo: boolean;
  gameHasFinished(): boolean;
  getNextRoundNumber(): number;
  getPlayerNameThatDeals(): string;
  readonly showNumberOfCardsToDealNextRound: boolean;
  getNumberOfCardsToDealNextRound(): string;
  readonly showLimitScoreInfo: boolean;

  getPlayerPosition(playerId: number): number;
  getPlayerName(playerId: number): string;
  getTotalScore(playerId: number, round?: number): number;
  getScoreLastRound(playerId: number): number;
  readonly showMaximumReachedScorePlayerDisplay: boolean;
  getMaximumReachedScore(playerId: number): number;
  getMinimumReachedScore(playerId: number): number;
  readonly showNumberOfRejoinsPlayerDisplay: boolean;
  getNumberOfRejoins(playerId: number): number;

  get rankingPlayers(): Player[];
  gameHasStarted(): boolean;

  getCellBackgroundColor(score: number): string;
  getPlayerAccumulatedScoreAtRound(playerId: number, round: number): number;
  getPlayerAccumulatedScoreAtSpecialRound(playerId: number, round: number): number;
  showSpecialRowAfterRound(round: number): boolean;
  getSpecialRoundScores(round: number): number[];

  readonly showProgressGraph: boolean;
  readonly svgWidth: number;
  getViewBox(): { widht: number; height: number };
  getSvgPlayerLine(player: Player): string;
}
