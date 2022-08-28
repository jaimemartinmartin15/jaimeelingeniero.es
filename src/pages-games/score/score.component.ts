import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PREVIOUS_GAME_DATE_KEY, PREVIOUS_GAME_KEY } from './local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './next-round-pop-up/next-round-pop-up.contract';
import { RankingPlayer } from './ranking/player-display/ranking-player';
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
  public showScoreboardRankingToggle = true;

  public players: RankingPlayer[];

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Tabla de puntuaciones');
    this.metaService.updateTag({ name: 'description', content: 'Tabla de puntuaciones online para apuntar los puntos de cada jugador' });
    this.metaService.updateTag({ name: 'keywords', content: 'tabla de puntuaciones, online, ranking, clasificacion' });

    if (this.checkRestartGame()) {
      return;
    }

    this.showStartGamePopUp = true;
  }

  private checkRestartGame(): boolean {
    const lastSavedGameDate = localStorage.getItem(PREVIOUS_GAME_DATE_KEY);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    if (lastSavedGameDate != null && Date.now() - +lastSavedGameDate < twoHoursAgo) {
      this.showRestartGamePopUp = true;
      return true;
    }

    return false;
  }

  public onConfirmRestartGame(restartGame: boolean) {
    this.showRestartGamePopUp = false;

    if (!restartGame) {
      this.showStartGamePopUp = true;
      return;
    }

    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this.players = players;
    }
  }

  public prepareRanking(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.players = players.map((name, id) => ({ id, name, position: 1, scores: [], totalScore: 0 }));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.players[0].scores.length + 1,
      players: this.players.map((p) => ({ ...p, punctuation: 0 })).sort((p1, p2) => p1.id - p2.id),
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    output.players.forEach((p1) => {
      const p2 = this.players.find((p2) => p1.id === p2.id)!;
      p2.scores.push(p1.punctuation);
      p2.totalScore += p1.punctuation;
    });

    this.players.sort((p1, p2) => p2.totalScore - p1.totalScore);
    const scores = this.players.map((p) => p.totalScore);
    this.players.forEach((player) => {
      player.position = scores.indexOf(player.totalScore) + 1;
    });

    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this.players }));
    localStorage.setItem(PREVIOUS_GAME_DATE_KEY, JSON.stringify(Date.now()));
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}
