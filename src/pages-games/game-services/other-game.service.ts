import { Injectable } from '@angular/core';
import { Player } from '../player';
import { GameService } from './game.service';

@Injectable()
export class OtherGameService implements GameService {
  public readonly gameName = 'Otro juego';

  private _players: Player[];
  public get players(): Player[] {
    return [...this._players];
  }
  public set players(value: Player[]) {
    this._players = value;
  }
  public playerStartsDealing = 0;

  public numberOfCards: number; // ignored
  public limitScore: number; // ignored
  public winner: 'highestScore' | 'lowestScore' = 'highestScore';

  public readonly showNumberOfCardsConfig = false;
  public readonly showLimitScoreConfig = false;
  public readonly showWinnerConfig = true;

  public readonly showGameNameInfo = false;
  public gameHasFinished(): boolean {
    return false;
  }
  public getNextRoundNumber(): number {
    return this._players[0].scores.length + 1;
  }
  public getPlayerNameThatDeals(): string {
    return this.players[(this.playerStartsDealing + this.getNextRoundNumber() - 1) % this.players.length].name;
  }
  public readonly showNumberOfCardsToDealNextRound = false;
  public getNumberOfCardsToDealNextRound(): string {
    throw new Error('Other game does not support number of cards');
  }
  public readonly showLimitScoreInfo = false;

  public getPlayerPosition(playerId: number): number {
    const accumulatedScores = this.players.map((p) => p.scores.reduce((acc, current) => acc + current), 0);
    const accumulatedScoresSorted = [...accumulatedScores].sort((n1, n2) => (this.winner === 'highestScore' ? n2 - n1 : n1 - n2));
    return accumulatedScoresSorted.indexOf(accumulatedScores[playerId]) + 1;
  }
  public getPlayerName(playerId: number): string {
    return this._players[playerId].name;
  }
  public getTotalScore(playerId: number): number {
    return this.players[playerId].scores.reduce((acc, current) => acc + current, 0);
  }
  public getScoreLastRound(playerId: number): number {
    const lastRoundIndex = this._players[playerId].scores.length - 1;
    return this._players[playerId].scores[lastRoundIndex];
  }
  public showMaximumReachedScorePlayerDisplay = false;
  public getMaximumReachedScore(): number {
    throw new Error('Other game does not support maximum reached score');
  }
  public showNumberOfRejoinsPlayerDisplay = false;
  public getNumberOfRejoins(): number {
    throw new Error('Chinchon game does not support rejoins');
  }

  public get rankingPlayers(): Player[] {
    const totalScores = this.players.map((p) => this.getTotalScore(p.id));
    return this.players.sort((p1, p2) =>
      this.winner === 'highestScore' ? totalScores[p2.id] - totalScores[p1.id] : totalScores[p1.id] - totalScores[p2.id]
    );
  }
  public gameHasStarted(): boolean {
    return this._players[0].scores.length > 0;
  }

  public getCellBackgroundColor(score: number): string {
    // TODO
    return 'red';
  }
  public getPlayerAccumulatedScoreAtRound(playerId: number, round: number): number {
    // TODO
    return 0;
  }
  public getPlayerAccumulatedScoreAtSpecialRound(playerId: number, round: number): number {
    // TODO
    return 0;
  }
  public showSpecialRowAfterRound(round: number): boolean {
    // TODO
    return true;
  }
  public getSpecialRoundScores(round: number): number[] {
    // TODO
    return [0, 5, 4, 8, 9, 6, 7];
  }
}
