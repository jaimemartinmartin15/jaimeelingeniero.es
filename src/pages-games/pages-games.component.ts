import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, fromEvent, map, pairwise, startWith, tap } from 'rxjs';
import { PREVIOUS_GAME_DATE_KEY } from './local-storage-keys';
import { PATHS } from './paths';
import { EnterPunctuationPopUpInput, EnterPunctuationPopUpOutput } from './pop-ups/enter-punctuation-pop-up/enter-punctuation-pop-up.contract';
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

  public showContinueGameInProgressPopUp = false;
  public showEnterPunctuationPopUp = false;

  public enterPunctuationPopUpInput: EnterPunctuationPopUpInput;

  public constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private readonly playersService: PlayersService,
    private readonly gameConfigService: GameConfigService,
    public readonly popUpsService: PopUpsService,
    public readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.setTitleAndTags();

    this.listenOpenEnterRoundPopUp();
    this.listenAddressBarMobile();

    if (!this.checkIfThereIsGameInProgress()) {
      this.router.navigate(['./', PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
      return;
    }

    this.showContinueGameInProgressPopUp = true;
  }

  private listenOpenEnterRoundPopUp() {
    this.popUpsService.enterNewRound$.subscribe(() => this.enterNewRound());
    this.popUpsService.enterRound$.subscribe((round: number) => this.enterRound(round));
    this.popUpsService.enterPunctuationForRoundAndPlayer$.subscribe((roundAndPlayer) => this.enterPunctuationForRoundAndPlayer(roundAndPlayer));
  }

  /**
   * Checks when the address bar in mobile is shown or hidden to fix the height of the router-outlet container
   */
  private listenAddressBarMobile() {
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

  private checkIfThereIsGameInProgress(): boolean {
    const lastSavedGameDate = localStorage.getItem(PREVIOUS_GAME_DATE_KEY);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    return lastSavedGameDate != null && +lastSavedGameDate > twoHoursAgo;
  }

  public onConfirmIfContinueGameInProgress(continueGame: boolean) {
    this.showContinueGameInProgressPopUp = false;

    if (!continueGame) {
      this.router.navigate(['./', PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute });
      return;
    }

    this.playersService.loadPlayersFromLocalStorage();
    this.gameConfigService.loadConfigFromLocalStorage();
    this.playersService.playersLoaded$.next();
    this.router.navigate(['./', PATHS.RANKING], { relativeTo: this.activatedRoute });
  }

  private enterNewRound() {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: this.playersService.nextRoundNumber,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = 0;
        return p;
      }),
    };
  }

  private enterRound(round: number) {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: round + 1,
      players: this.playersService.playersById.map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  private enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: round + 1,
      players: [this.playersService.playerWithId(player)].map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public onResultEnterPunctuation({ players, round }: EnterPunctuationPopUpOutput) {
    this.showEnterPunctuationPopUp = false;
    this.playersService.setScores(players, round - 1);
    this.playersService.calculateAccumulatedScores();
    this.playersService.calculateRejoins();
    this.playersService.calculatePlayerPositions();
    this.playersService.savePlayersToLocalStorage();
    this.gameConfigService.saveConfigToLocalStorage();
    this.playersService.scoreChanged$.next();
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
