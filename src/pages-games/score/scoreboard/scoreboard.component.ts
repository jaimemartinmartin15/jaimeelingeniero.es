import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PREVIOUS_GAME_KEY } from '../local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from '../next-round-pop-up/next-round-pop-up.contract';
import { Player } from '../player';
import { StartGamePopUpOutput } from '../start-game-pop-up/start-game-pop-up.contract';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  public showReloadGamePopUp = false;
  public showStartGamePopUp = true;
  public showNewRoundPopUp = false;

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public players: Player[];
  public rounds: number[][] = [];

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.showReloadGamePopUp = localStorage.getItem(PREVIOUS_GAME_KEY) != null;
    setTimeout(() => (this.showReloadGamePopUp = false), 30e3);

    this.titleService.setTitle('Tabla de puntuaciones');
    this.metaService.updateTag({ name: 'description', content: 'Tabla de puntuaciones online para apuntar los puntos de cada jugador' });
    this.metaService.updateTag({ name: 'keywords', content: 'tabla de puntuaciones, online, ranking, clasificacion' });
  }

  public getTotalScore(player: number): number {
    return this.rounds.reduce((score, round) => score + round[player], 0);
  }

  public prepareTable(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.players = players.map((name, id) => ({ name, id }));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.rounds.length + 1,
      players: this.players.map((p) => ({ ...p, punctuation: 0 })),
    };
  }

  public enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.players.map((p, i) => ({ ...p, punctuation: this.rounds[round][i] })),
    };
  }

  public enterPunctuationForRoundAndPlayer(round: number, player: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: [{ ...this.players[player], punctuation: this.rounds[round][player] }],
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    this.showReloadGamePopUp = false;
    const round = output.round - 1;
    if (this.rounds[round] == undefined) {
      this.rounds[round] = new Array(this.players.length);
    }
    output.players.forEach((player) => (this.rounds[round][player.id] = player.punctuation));
    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this.players, rounds: this.rounds }));
  }

  public reloadGame() {
    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players, rounds } = JSON.parse(previousGame);
      this.players = players;
      this.rounds = rounds;
    }
  }

  public getBackgroundColor(score: number): string {
    const maxScore = Math.max(...this.rounds.flatMap((r) => r));
    const minScore = Math.min(...this.rounds.flatMap((r) => r));

    if (score >= 0) {
      const scorePercentile = score / maxScore;
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(${threshold}, 255, ${threshold})`;
    } else {
      const scorePercentile = Math.abs(score) / Math.abs(minScore);
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(255,${threshold}, ${threshold})`;
    }
  }

  public getPosition(playerId: number): number {
    const scores = this.rounds.reduce((prev, current) => prev.map((p, i) => p + current[i]), new Array(this.players.length).fill(0));
    const sortScores = [...scores].sort((a, b) => a - b);
    return sortScores.reverse().indexOf(scores[playerId]) + 1;
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
