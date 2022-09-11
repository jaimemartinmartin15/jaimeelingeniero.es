import { Injectable } from '@angular/core';
import { PREVIOUS_GAME_DATE_KEY, PREVIOUS_GAME_KEY } from '../local-storage-keys';
import { IPlayer, Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public players: Player[];

  public playersSortedBy(key: keyof Pick<Player, 'id' | 'position'>): Player[] {
    return this.players.sort((p1, p2) => p1[key] - p2[key]);
  }

  public getPlayerWithId(id: number): Player {
    return this.players.find((p) => p.id === id)!;
  }

  public loadPlayersFromLocalStorage() {
    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this.players = players.map((p: IPlayer) => new Player(p.id, p.name, p.scores, p.accumulatedScores, p.position));
    }
  }

  public savePlayersToLocalStorage() {
    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this.players }));
    localStorage.setItem(PREVIOUS_GAME_DATE_KEY, JSON.stringify(Date.now()));
  }

  public calculatePlayerPositions() {
    const scores = this.players.sort((p1, p2) => p2.totalScore - p1.totalScore).map((p) => p.totalScore);
    this.players.forEach((p) => (p.position = scores.indexOf(p.totalScore) + 1));
  }

  public get nextRoundNumber(): number {
    return this.players[0].scores.length + 1;
  }

  public get maximumAccumulatedScore(): number {
    return Math.max(...this.players.map((p) => p.maximumAccumulatedScore));
  }

  public get minimumAccumulatedScore(): number {
    return Math.min(...this.players.map((p) => p.minimumAccumulatedScore));
  }

  public get maximumScoreInOneRound(): number {
    return Math.max(...this.players.map((p) => p.maximumScoreInOneRound));
  }

  public get minimumScoreInOneRound(): number {
    return Math.min(...this.players.map((p) => p.minimumScoreInOneRound));
  }
}
