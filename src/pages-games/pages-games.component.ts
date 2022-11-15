import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { distinctUntilChanged, filter, fromEvent, map, pairwise, startWith, tap } from 'rxjs';
import { PREVIOUS_GAME_DATE_KEY } from './local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './pop-ups/next-round-pop-up/next-round-pop-up.contract';
import { StartGamePopUpOutput } from './pop-ups/start-game-pop-up/start-game-pop-up.contract';
import { GameConfigService } from './services/game/game-config.service';
import { PlayersService } from './services/player/players.service';
import { PopUpsService } from './services/pop-ups.service';

@Component({
  selector: 'app-pages-games',
  templateUrl: './pages-games.component.html',
  styleUrls: ['./pages-games.component.scss'],
})
export class PagesGamesComponent implements OnInit, OnDestroy {
  public addressBarHidden = false;

  // show pop-ups views
  public showRestartGamePopUp = false;
  public showStartGamePopUp = false;
  public showNewRoundPopUp = false;
  public showLoadNewGamePopUp = false;

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private readonly playersService: PlayersService,
    private readonly gameConfigService: GameConfigService,
    public readonly popUpsService: PopUpsService
  ) {}

  public ngOnInit(): void {
    this.setTitleAndTags();

    const restartGame = this.checkIfRestartGame();
    this.showRestartGamePopUp = restartGame;
    this.showStartGamePopUp = !restartGame;

    this.popUpsService.openStartNewGamePopUp$.subscribe(() => (this.showStartGamePopUp = true));
    this.popUpsService.enterNewRound$.subscribe(() => this.enterNewRound());
    this.popUpsService.enterRound$.subscribe((round: number) => this.enterRound(round));
    this.popUpsService.enterPunctuationForRoundAndPlayer$.subscribe((roundAndPlayer) => this.enterPunctuationForRoundAndPlayer(roundAndPlayer));

    // check when the address bar in mobile is hidden
    if (window.matchMedia('(max-width: 991px)').matches) {
      fromEvent(window, 'resize')
        .pipe(
          startWith(''),
          map(() => Math.max(this.document.documentElement.clientHeight, window.innerHeight || 0)),
          pairwise(),
          filter(([prevHeight, currentHeight]) => prevHeight !== currentHeight),
          map(([prevHeight, currentHeight]) => prevHeight < currentHeight),
          distinctUntilChanged(),
          tap((addressBarHidden) => (this.addressBarHidden = addressBarHidden))
        )
        .subscribe();
    }
  }

  public setTitleAndTags() {
    this.titleService.setTitle('Puntuaciones');
    this.metaService.updateTag({
      name: 'description',
      content: `
        Utiliza esta aplicación cuando estes jugando a las cartas con amigos o la familia
        y anota las puntuaciones para saber quién gana. Obtén estadísticas y bonitos gráficos.
      `,
    });
    this.metaService.updateTag({ name: 'keywords', content: 'tabla, puntuaciones, cartas, juego, online, ranking, clasificacion' });

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
    this.gameConfigService.loadConfigFromLocalStorage();
    this.playersService.playersLoaded$.next();
  }

  public onConfirmStartGame(output: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.playersService.createPlayersWithNames(output.names);
    this.playersService.playersLoaded$.next();
    this.playersService.startsDealing = output.startsDealing;
  }

  private enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.playersService.nextRoundNumber,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = 0;
        return p;
      }),
    };
  }

  private enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  private enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
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
    this.playersService.setScores(players, round - 1);
    this.playersService.calculateAccumulatedScores();
    this.playersService.calculateRejoins();
    this.playersService.calculatePlayerPositions();
    this.playersService.savePlayersToLocalStorage();
    this.gameConfigService.saveConfigToLocalStorage();
    this.playersService.scoreChanged$.next();
  }

  public onConfirmIfLoadNewGame(confirmNewGame: boolean) {
    this.showLoadNewGamePopUp = false;
    this.showStartGamePopUp = confirmNewGame;
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
