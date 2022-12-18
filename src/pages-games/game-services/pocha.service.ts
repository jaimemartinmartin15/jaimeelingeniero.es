import { Injectable } from '@angular/core';
import { Player } from '../player';
import { GameService } from './game.service';

@Injectable()
export class PochaService implements GameService {
  public readonly gameName = 'Pocha';

  private _players: Player[];
  public get players(): Player[] {
    return [...this._players];
  }
  public set players(value: Player[]) {
    this._players = value;
  }
  public playerStartsDealing = 0;

  public numberOfCards = 40;
  public limitScore: number; // ignored
  public winner: 'highestScore' | 'lowestScore'; // ignored

  public showNumberOfCardsConfig = true;
  public showLimitScoreConfig = false;
  public showWinnerConfig = false;

  public showGameNameInfo = true;
  public gameHasFinished(): boolean {
    return this.getNextRoundNumber() > (this.numberOfCards / this.players.length - 1) * 2 + this.players.length + 1;
  }
  public getNextRoundNumber(): number {
    return this._players[0].scores.length + 1;
  }
  public getPlayerNameThatDeals(): string {
    return this.players[(this.playerStartsDealing + this.getNextRoundNumber() - 1) % this.players.length].name;
  }
  public showNumberOfCardsToDealNextRound = true;
  public getNumberOfCardsToDealNextRound(): string {
    const cardsBetweenPlayers = Math.floor(this.numberOfCards / this._players.length);

    if (this.getNextRoundNumber() <= cardsBetweenPlayers) {
      return `${this.getNextRoundNumber()}`;
    }

    if (this.getNextRoundNumber() < cardsBetweenPlayers + this.players.length) {
      return `${cardsBetweenPlayers}`;
    }

    const cardsToDeal = Math.floor(cardsBetweenPlayers - (this.getNextRoundNumber() - cardsBetweenPlayers - this.players.length) - 1);
    return cardsToDeal === 0 ? '1 (frente)' : `${cardsToDeal}`;
  }
  public showLimitScoreInfo = false;

  public getPlayerPosition(playerId: number): number {
    const accumulatedScores = this.players.map((p) => p.scores.reduce((acc, current) => acc + current), 0);
    const accumulatedScoresSorted = [...accumulatedScores].sort((n1, n2) => n2 - n1);
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
  public showMaximumReachedScorePlayerDisplay = true;
  public getMaximumReachedScore(playerId: number): number {
    const accumulatedScoresAtRounds = this.players[playerId].scores.reduce((prev, current, index) => [...prev, prev[index] + current], [0]);
    return Math.max(...accumulatedScoresAtRounds);
  }
  public showNumberOfRejoinsPlayerDisplay = false;
  public getNumberOfRejoins(): number {
    // ignored
    throw new Error('Pocha game does not support rejoins');
  }

  public get rankingPlayers(): Player[] {
    const totalScores = this.players.map((p) => this.getTotalScore(p.id));
    const maximumScores = this.players.map((p) => this.getMaximumReachedScore(p.id));
    return this.players.sort((p1, p2) => totalScores[p2.id] - totalScores[p1.id] || maximumScores[p2.id] - maximumScores[p1.id]);
  }
  public gameHasStarted(): boolean {
    return this._players[0].scores.length > 0;
  }

  public getCellBackgroundColor(score: number): string {
    const maximumScoreInOneRound = Math.max(...this._players.flatMap((p) => p.scores));
    const minimumScoreInOneRound = Math.min(...this._players.flatMap((p) => p.scores));
    if (score >= 0) {
      const scorePercentile = score / maximumScoreInOneRound;
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(${threshold}, 255, ${threshold})`;
    } else {
      const scorePercentile = Math.abs(score) / Math.abs(minimumScoreInOneRound);
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(255,${threshold}, ${threshold})`;
    }
  }
  public getPlayerAccumulatedScoreAtRound(playerId: number, round: number): number {
    return this._players[playerId].scores.slice(0, round + 1).reduce((prev, current) => prev + current, 0);
  }
  public getPlayerAccumulatedScoreAtSpecialRound(): number {
    return 0; // ignored
  }
  public showSpecialRowAfterRound(): boolean {
    return false;
  }
  public getSpecialRoundScores(): number[] {
    return []; // ignored
  }

  readonly showProgressGraph = true;
}
