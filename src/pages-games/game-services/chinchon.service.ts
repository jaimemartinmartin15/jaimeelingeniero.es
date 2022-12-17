import { Injectable } from '@angular/core';
import { Player } from '../player';
import { GameService } from './game.service';

@Injectable()
export class ChinchonService implements GameService {
  public readonly gameName = 'Chinchón';

  private _players: Player[];
  public get players(): Player[] {
    return [...this._players];
  }
  public set players(value: Player[]) {
    this._players = value;
  }
  public playerStartsDealing = 0;

  public numberOfCards: number; // ignored
  public limitScore = 100;
  public winner: 'highestScore' | 'lowestScore'; // ignored

  public showNumberOfCardsConfig = false;
  public showLimitScoreConfig = true;
  public showWinnerConfig = false;

  public showGameNameInfo = true;
  public gameHasFinished(): boolean {
    const numberOfRounds = this.players[0].scores.length;
    const numberOfPlayers = this.players.length;

    let accumulatedScoresAtRound = new Array(this.players.length).fill(0);
    for (let r = 0; r < numberOfRounds; r++) {
      accumulatedScoresAtRound = accumulatedScoresAtRound.map((scoreAcc, p) => scoreAcc + this.players[p].scores[r]);
      const rejoinScore = Math.max(...accumulatedScoresAtRound.filter((s) => s <= this.limitScore));
      const thereIsWinner = accumulatedScoresAtRound.filter((s) => s <= this.limitScore).length === 1;

      if (thereIsWinner) return true;

      for (let p = 0; p < numberOfPlayers; p++) {
        if (accumulatedScoresAtRound[p] > this.limitScore) {
          accumulatedScoresAtRound[p] = rejoinScore;
        }
      }
    }

    return false;
  }
  public getNextRoundNumber(): number {
    return this._players[0].scores.length + 1;
  }
  public getPlayerNameThatDeals(): string {
    return this.players[(this.playerStartsDealing + this.getNextRoundNumber() - 1) % this.players.length].name;
  }
  public showNumberOfCardsToDealNextRound = false;
  public getNumberOfCardsToDealNextRound(): string {
    throw new Error('Chinchón game does not support number of cards to deal. It is always 7.');
  }
  public showLimitScoreInfo = true;

  public getPlayerPosition(playerId: number): number {
    const totalScores = this.players.map((p) => this.getTotalScore(p.id));
    const totalScoresSorted = [...totalScores].sort((n1, n2) => n1 - n2);
    return totalScoresSorted.indexOf(totalScores[playerId]) + 1;
  }
  public getPlayerName(playerId: number): string {
    return this._players[playerId].name;
  }
  public getTotalScore(playerId: number): number {
    const numberOfRounds = this.players[0].scores.length;
    const numberOfPlayers = this.players.length;

    let accumulatedScoresAtRound = new Array(this.players.length).fill(0);
    for (let r = 0; r < numberOfRounds; r++) {
      accumulatedScoresAtRound = accumulatedScoresAtRound.map((scoreAcc, i) => scoreAcc + this.players[i].scores[r]);
      const rejoinScore = Math.max(...accumulatedScoresAtRound.filter((s) => s <= this.limitScore));
      const thereIsWinner = accumulatedScoresAtRound.filter((s) => s <= this.limitScore).length === 1;

      // reset scores outside limit
      if (!thereIsWinner) {
        for (let p = 0; p < numberOfPlayers; p++) {
          if (accumulatedScoresAtRound[p] > this.limitScore) {
            accumulatedScoresAtRound[p] = rejoinScore;
          }
        }
      }
    }

    return accumulatedScoresAtRound[playerId];
  }
  public getScoreLastRound(playerId: number): number {
    const lastRoundIndex = this._players[playerId].scores.length - 1;
    return this._players[playerId].scores[lastRoundIndex];
  }
  public showMaximumReachedScorePlayerDisplay = false;
  public getMaximumReachedScore(): number {
    // ignored
    throw new Error('Chinchon game does not support maximum reached score');
  }
  public showNumberOfRejoinsPlayerDisplay = true;
  public getNumberOfRejoins(playerId: number): number {
    const numberOfRejoins = new Array(this.players.length).fill(0);
    const numberOfRounds = this.players[0].scores.length;
    const numberOfPlayers = this.players.length;

    let accumulatedScoresAtRound = new Array(this.players.length).fill(0);
    for (let r = 0; r < numberOfRounds; r++) {
      accumulatedScoresAtRound = accumulatedScoresAtRound.map((scoreAcc, i) => scoreAcc + this.players[i].scores[r]);
      const rejoinScore = Math.max(...accumulatedScoresAtRound.filter((s) => s <= this.limitScore));
      const thereIsWinner = accumulatedScoresAtRound.filter((s) => s <= this.limitScore).length === 1;

      // reset scores outside limit and increment number of rejoins
      if (!thereIsWinner) {
        for (let p = 0; p < numberOfPlayers; p++) {
          if (accumulatedScoresAtRound[p] > this.limitScore) {
            numberOfRejoins[p]++;
            accumulatedScoresAtRound[p] = rejoinScore;
          }
        }
      }
    }

    return numberOfRejoins[playerId];
  }

  public get rankingPlayers(): Player[] {
    const totalScores = this.players.map((p) => this.getTotalScore(p.id));
    const rejoins = this.players.map((p) => this.getNumberOfRejoins(p.id));
    return this.players.sort((p1, p2) => totalScores[p1.id] - totalScores[p2.id] || rejoins[p1.id] - rejoins[p2.id]);
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
}
