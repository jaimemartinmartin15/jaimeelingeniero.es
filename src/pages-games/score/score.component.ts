import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PREVIOUS_GAME_DATE_KEY, PREVIOUS_GAME_KEY } from './local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './next-round-pop-up/next-round-pop-up.contract';
import { IPlayer, Player } from './player/player';
import { StartGamePopUpOutput } from './start-game-pop-up/start-game-pop-up.contract';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  public showRestartGamePopUp = false;
  public showStartGamePopUp = false;
  public showNewRoundPopUp = false;
  public showLoadNewGamePopUp = false;
  public showView: 'table' | 'ranking' | 'statistics' = 'ranking';

  public players: Player[];

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Tabla de puntuaciones');
    this.metaService.updateTag({ name: 'description', content: 'Tabla de puntuaciones online para apuntar los puntos de cada jugador' });
    this.metaService.updateTag({ name: 'keywords', content: 'tabla de puntuaciones, online, ranking, clasificacion' });

    const restartGame = this.checkIfRestartGame();
    this.showRestartGamePopUp = restartGame;
    this.showStartGamePopUp = !restartGame;
  }

  private checkIfRestartGame(): boolean {
    const lastSavedGameDate = localStorage.getItem(PREVIOUS_GAME_DATE_KEY);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    return lastSavedGameDate != null && +lastSavedGameDate > twoHoursAgo;
  }

  public onConfirmIfRestartGame(restartGame: boolean) {
    this.showRestartGamePopUp = false;

    if (!restartGame) {
      this.showStartGamePopUp = true;
      return;
    }

    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this.players = players.map((p: IPlayer) => new Player(p.id, p.name, p.scores, p.accumulatedScores, p.position));
      this.calculatePlayersPosition();
    }
  }

  public onConfirmStartGame(names: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.players = names.map((name, id) => new Player(id, name));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.players[0].scores.length + 1,
      players: this.players
        .map((p) => {
          p.punctuation = 0;
          return p;
        })
        .sort((p1, p2) => p1.id - p2.id),
    };
  }

  public enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.players
        .map((p) => {
          p.punctuation = p.scores[round];
          return p;
        })
        .sort((p1, p2) => p1.id - p2.id),
    };
  }

  public enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: [this.players[player]].map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    output.players.forEach((p1) => {
      const p2 = this.players.find((p2) => p1.id === p2.id)!;
      p2.setRoundValue(p1.punctuation, output.round - 1);
    });

    if (this.showView === 'ranking') {
      this.calculatePlayersPosition();
    }

    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this.players }));
    localStorage.setItem(PREVIOUS_GAME_DATE_KEY, JSON.stringify(Date.now()));
  }

  public showTableView(): void {
    this.showView = 'table';
    this.players.sort((p1, p2) => p1.id - p2.id);
  }

  public showRankingView(): void {
    this.showView = 'ranking';
    this.calculatePlayersPosition();
  }

  public showStatisticsView(): void {
    this.showView = 'statistics';
    this.players.sort((p1, p2) => p1.id - p2.id);
  }

  private calculatePlayersPosition() {
    this.players.sort((p1, p2) => p2.totalScore - p1.totalScore);
    const scores = this.players.map((p) => p.totalScore);
    this.players.forEach((player) => {
      player.position = scores.indexOf(player.totalScore) + 1;
    });
  }

  public loadNewGame(confirmNewGame: boolean) {
    this.showLoadNewGamePopUp = false;
    this.showStartGamePopUp = confirmNewGame;
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
