import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { GameConfigService } from '../game/game-config.service';
import { PREVIOUS_GAME_DATE_KEY, PREVIOUS_GAME_KEY } from '../../local-storage-keys';
import { IPlayer, Player } from './player';

@Injectable()
export class PlayersService {
  private _players: Player[];
  private _startsDealing = 0;

  public readonly playersLoaded$ = new ReplaySubject<void>(1);
  public readonly scoreChanged$ = new ReplaySubject<void>(1);

  public constructor(private readonly gameConfigService: GameConfigService) {}

  public set players(value: Player[]) {
    this._players = value;
  }

  public get playersById(): Player[] {
    return this._players.sort((p1, p2) => p1.id - p2.id);
  }

  public get playersByPosition(): Player[] {
    return this._players.sort((p1, p2) => p1.position - p2.position);
  }

  public get playersByTotalScore(): Player[] {
    return this._players.sort((p1, p2) => p2.totalScore - p1.totalScore);
  }

  public get playersRankingView(): Player[] {
    return this._players.sort(this.gameConfigService.config.sortPlayers);
  }

  public get playedRounds(): number {
    return this._players[0].scores.length;
  }

  public get nextRoundNumber(): number {
    return this.playedRounds + 1;
  }

  public get maximumAccumulatedScore(): number {
    return Math.max(...this._players.map((p) => p.maximumAccumulatedScore));
  }

  public get minimumAccumulatedScore(): number {
    return Math.min(...this._players.map((p) => p.minimumAccumulatedScore));
  }

  public get maximumScoreInOneRound(): number {
    return Math.max(...this._players.map((p) => p.maximumScoreInOneRound));
  }

  public get minimumScoreInOneRound(): number {
    return Math.min(...this._players.map((p) => p.minimumScoreInOneRound));
  }

  public get playerNameDealsNextRound(): string {
    return this.playersById[(this._startsDealing + this.playedRounds) % this._players.length].name;
  }

  public set startsDealing(v: number) {
    this._startsDealing = v;
  }

  public get cardsToDealNextRound(): number {
    const cardsNumber = this.gameConfigService.config.cardsNumber!;
    const playersNumber = this._players.length;

    if (this.nextRoundNumber <= cardsNumber / playersNumber) {
      return this.nextRoundNumber;
    } else if (this.nextRoundNumber < cardsNumber / playersNumber + playersNumber) {
      return Math.floor(cardsNumber / playersNumber);
    } else {
      return Math.floor(cardsNumber / playersNumber - (this.nextRoundNumber - cardsNumber / playersNumber - playersNumber) - 1);
    }
  }

  public playerWithId(id: number): Player {
    return this._players.find((p) => p.id === id)!;
  }

  public createPlayersWithNames(names: string[]) {
    this._players = names.map((name, id) => new Player(id, name.trim()));
  }

  public loadPlayersFromLocalStorage() {
    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this._players = players.map((p: IPlayer) => new Player(p.id, p.name, p.scores, p.accumulatedScores, p.position, p.rejoins));
    }
  }

  public savePlayersToLocalStorage() {
    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this._players }));
    localStorage.setItem(PREVIOUS_GAME_DATE_KEY, JSON.stringify(Date.now()));
  }

  public setScores(players: Pick<Player, 'id' | 'punctuation'>[], round: number) {
    players.forEach((p1) => this.playerWithId(p1.id).setRoundValue(p1.punctuation, round));
  }

  public calculateAccumulatedScores() {
    for (let round = 0; round < this.playedRounds; round++) {
      const limitScore = this.gameConfigService.config.limitScore ?? Infinity;
      const scoreReset = Math.max(
        ...this._players
          .filter((p) => p.accumulatedScores[round].afterRejoin + p.scores[round] < limitScore)
          .map((p) => p.accumulatedScores[round].afterRejoin + p.scores[round])
      );
      this._players.forEach((p) => p.calculateAccumulatedScores(round, limitScore, scoreReset));
    }
  }

  public calculateRejoins() {
    const limitScore = this.gameConfigService.config.limitScore;
    if (limitScore != undefined) {
      this._players.forEach((p) => p.calculateRejoins());
    }
  }

  public calculatePlayerPositions() {
    const scores = this._players.sort(this.gameConfigService.config.sortPlayers).map((p) => p.totalScore);
    this._players.forEach((p) => (p.position = scores.indexOf(p.totalScore) + 1));
  }
}
