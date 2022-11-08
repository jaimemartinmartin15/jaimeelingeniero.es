import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PREVIOUS_GAME_DATE_KEY } from './local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from '../pop-ups/next-round-pop-up/next-round-pop-up.contract';
import { PlayersService } from '../services/player/players.service';
import { StartGamePopUpOutput } from '../pop-ups/start-game-pop-up/start-game-pop-up.contract';

type View = 'table' | 'ranking' | 'statistics';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit, OnDestroy {
  public showRestartGamePopUp = false;
  public showStartGamePopUp = false;
  public showNewRoundPopUp = false;
  public showLoadNewGamePopUp = false;
  public showView: View = 'ranking';

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private readonly playersService: PlayersService
  ) {}

  public ngOnInit(): void {
    this.setTitleAndTags();

    const restartGame = this.checkIfRestartGame();
    this.showRestartGamePopUp = restartGame;
    this.showStartGamePopUp = !restartGame;
  }

  public setTitleAndTags() {
    this.titleService.setTitle('Tabla de puntuaciones');
    this.metaService.updateTag({ name: 'description', content: 'Tabla de puntuaciones online para apuntar los puntos de cada jugador' });
    this.metaService.updateTag({ name: 'keywords', content: 'tabla de puntuaciones, online, ranking, clasificacion' });

    const linkElementsFavIcon = this.document.getElementsByClassName('favIcon');
    for (let i = 0; i < linkElementsFavIcon.length; i++) {
      let linkElement = linkElementsFavIcon.item(i) as HTMLLinkElement;
      const size = linkElement.sizes.value.split('x')[0];
      linkElement.href = `assets/favicons/puntuaciones/favicon-${size}x${size}.png`;
    }
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
    this.playersService.playersLoaded$.next();
  }

  public onConfirmStartGame(output: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.playersService.createPlayersWithNames(output.names);
    this.playersService.playersLoaded$.next();
    this.playersService.startsDealing = output.startsDealing;
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.playersService.nextRoundNumber,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = 0;
        return p;
      }),
    };
  }

  public enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: [this.playersService.playerWithId(player)].map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public onResultNewRound({ players, round }: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    players.forEach((p1) => this.playersService.playerWithId(p1.id).setRoundValue(p1.punctuation, round - 1));
    this.playersService.calculatePlayerPositions();
    this.playersService.savePlayersToLocalStorage();
    this.playersService.scoreChanged$.next();
  }

  public onConfirmIfLoadNewGame(confirmNewGame: boolean) {
    this.showLoadNewGamePopUp = false;
    this.showStartGamePopUp = confirmNewGame;
  }

  public changeView() {
    const nextViews: { [key: string]: View } = {
      ranking: 'table',
      table: 'statistics',
      statistics: 'ranking',
    };
    this.showView = nextViews[this.showView];
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');

    // set default favicons again
    const linkElementsFavIcon = this.document.getElementsByClassName('favIcon');
    for (let i = 0; i < linkElementsFavIcon.length; i++) {
      let linkElement = linkElementsFavIcon.item(i) as HTMLLinkElement;
      const size = linkElement.sizes.value.split('x')[0];
      linkElement.href = `assets/favicons/default/favicon-${size}x${size}.png`;
    }
  }
}
