import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PREVIOUS_GAME_DATE_KEY } from './local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './next-round-pop-up/next-round-pop-up.contract';
import { Player } from './player/player';
import { PlayersService } from './player/players.service';
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

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public constructor(private readonly titleService: Title, private readonly metaService: Meta, private readonly playersService: PlayersService) {}

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

    this.playersService.loadPlayersFromLocalStorage();
  }

  public onConfirmStartGame(names: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.playersService.players = names.map((name, id) => new Player(id, name));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.playersService.nextRoundNumber,
      players: this.playersService.playersSortedBy('id').map((p) => {
        p.punctuation = 0;
        return p;
      }),
    };
  }

  public enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.playersService.playersSortedBy('id').map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: [this.playersService.getPlayerWithId(player)].map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    output.players.forEach((p1) => this.playersService.getPlayerWithId(p1.id).setRoundValue(p1.punctuation, output.round - 1));
    this.playersService.calculatePlayerPositions();
    this.playersService.savePlayersToLocalStorage();
  }

  public showTableView(): void {
    this.showView = 'table';
  }

  public showRankingView(): void {
    this.showView = 'ranking';
  }

  public showStatisticsView(): void {
    this.showView = 'statistics';
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
