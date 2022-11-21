import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CONFIG_KEY, DATE_KEY, PLAYERS_KEY, STARTS_DEALING_KEY } from '../local-storage-keys';
import { IPlayer, Player } from '../interfaces/player';
import { GameConfig } from 'src/pages-games/game-configs/game-config';
import { ALL_CONFIGS } from 'src/pages-games/game-configs/all-configs';

@Injectable()
export class GameService {
  private _players: Player[];
  private _startsDealing = 0;
  private _selectedGameConfig: GameConfig;

  public readonly playersLoaded$ = new ReplaySubject<void>(1);
  public readonly scoreChanged$ = new ReplaySubject<void>(1);

  public set players(value: Player[]) {
    this._players = value;
  }

  public get playersById(): Player[] {
    return this._players.sort((p1, p2) => p1.id - p2.id);
  }

  public get playersRankingView(): Player[] {
    return this._players.sort(this.config.sortPlayers);
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
    const cardsNumber = this.config.cardsNumber!;
    const playersNumber = this._players.length;

    if (this.nextRoundNumber <= cardsNumber / playersNumber) {
      return this.nextRoundNumber;
    } else if (this.nextRoundNumber < cardsNumber / playersNumber + playersNumber) {
      return Math.floor(cardsNumber / playersNumber);
    } else {
      return Math.floor(cardsNumber / playersNumber - (this.nextRoundNumber - cardsNumber / playersNumber - playersNumber) - 1);
    }
  }

  public get config(): GameConfig {
    return this._selectedGameConfig;
  }

  public set config(config: GameConfig) {
    this._selectedGameConfig = config;
  }

  public playerWithId(id: number): Player {
    return this._players.find((p) => p.id === id)!;
  }

  public createPlayersWithNames(names: string[]) {
    this._players = names.map((name, id) => new Player(id, name.trim()));
  }

  public loadPlayersFromLocalStorage() {
    const previousGame = localStorage.getItem(PLAYERS_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this._players = players.map((p: IPlayer) => new Player(p.id, p.name, p.scores, p.accumulatedScores, p.position, p.rejoins));
    }
  }

  public savePlayersToLocalStorage() {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify({ players: this._players }));
    localStorage.setItem(DATE_KEY, JSON.stringify(Date.now()));
  }

  public loadConfigFromLocalStorage() {
    const previousGameConfig = localStorage.getItem(CONFIG_KEY);
    if (previousGameConfig != null) {
      const config = JSON.parse(previousGameConfig).config;
      const knownConfig = ALL_CONFIGS.find((c) => c.name === config.name);
      this._selectedGameConfig = { ...knownConfig, ...config };
    }
  }

  public saveConfigToLocalStorage() {
    localStorage.setItem(CONFIG_KEY, JSON.stringify({ config: this._selectedGameConfig }));
  }

  public loadWhoStartsDealingFromLocalStorage() {
    const startsDealingStorage = localStorage.getItem(STARTS_DEALING_KEY);
    if (startsDealingStorage != null) {
      this._startsDealing = +startsDealingStorage;
    }
  }

  public saveWhoStartsDealingFromLocalStorage() {
    localStorage.setItem(STARTS_DEALING_KEY, `${this._startsDealing}`);
  }

  public setScores(players: Pick<Player, 'id' | 'punctuation'>[], round: number) {
    players.forEach((p1) => this.playerWithId(p1.id).setRoundValue(p1.punctuation, round));
  }

  public calculateAccumulatedScores() {
    for (let round = 0; round < this.playedRounds; round++) {
      const limitScore = this.config.limitScore ?? Infinity;
      const scoreReset = Math.max(
        ...this._players
          .filter((p) => p.accumulatedScores[round].afterRejoin + p.scores[round] < limitScore)
          .map((p) => p.accumulatedScores[round].afterRejoin + p.scores[round])
      );
      this._players.forEach((p) => p.calculateAccumulatedScores(round, limitScore, scoreReset));
    }
  }

  public calculateRejoins() {
    const limitScore = this.config.limitScore;
    if (limitScore != undefined) {
      this._players.forEach((p) => p.calculateRejoins());
    }
  }

  public calculatePlayerPositions() {
    const scores = this._players.sort(this.config.sortPlayers).map((p) => p.totalScore.afterRejoin);
    this._players.forEach((p) => (p.position = scores.indexOf(p.totalScore.afterRejoin) + 1));
  }
}
