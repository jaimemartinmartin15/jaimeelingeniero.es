import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, fromEvent, map, pairwise, startWith, tap } from 'rxjs';
import { BottomControlsService } from './components/bottom-controls/bottom-controls.service';
import { PREVIOUS_GAME_DATE_KEY } from './local-storage-keys';
import { PATHS } from './paths';
import { EnterPunctuationPopUpInput, EnterPunctuationPopUpOutput } from './pop-ups/enter-punctuation-pop-up/enter-punctuation-pop-up.contract';
import { GameService } from './services/game.service';
import { ScoreboardService } from './views/scoreboard/scoreboard.service';

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
    private readonly gameService: GameService,
    public readonly scoreboardService: ScoreboardService,
    public readonly bottomControlsService: BottomControlsService,
    public readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.setTitleAndTags();

    this.listenOpenEnterPunctuationPopUp();
    this.listenAddressBarMobile();

    if (!this.thereIsGameInProgress()) {
      this.router.navigate(['./', PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
      return;
    }

    this.showContinueGameInProgressPopUp = true;
  }

  private listenOpenEnterPunctuationPopUp() {
    this.bottomControlsService.onClickEnterNewRound$.subscribe(() => this.enterNewRound());
    this.scoreboardService.enterRound$.subscribe((round: number) => this.enterRound(round));
    this.scoreboardService.enterPunctuationForRoundAndPlayer$.subscribe((roundAndPlayer) => this.enterPunctuationForRoundAndPlayer(roundAndPlayer));
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

  private thereIsGameInProgress(): boolean {
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

    this.gameService.loadPlayersFromLocalStorage();
    this.gameService.loadConfigFromLocalStorage();
    this.gameService.playersLoaded$.next();
    this.router.navigate(['./', PATHS.RANKING], { relativeTo: this.activatedRoute });
  }

  private enterNewRound() {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: this.gameService.nextRoundNumber,
      players: this.gameService.playersById.map((p) => {
        p.punctuation = 0;
        return p;
      }),
    };
  }

  private enterRound(round: number) {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: round + 1,
      players: this.gameService.playersById.map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  private enterPunctuationForRoundAndPlayer({ round, player }: { round: number; player: number }) {
    this.showEnterPunctuationPopUp = true;
    this.enterPunctuationPopUpInput = {
      round: round + 1,
      players: [this.gameService.playerWithId(player)].map((p) => {
        p.punctuation = p.scores[round];
        return p;
      }),
    };
  }

  public onResultEnterPunctuation({ players, round }: EnterPunctuationPopUpOutput) {
    this.showEnterPunctuationPopUp = false;
    this.gameService.setScores(players, round - 1);
    this.gameService.calculateAccumulatedScores();
    this.gameService.calculateRejoins();
    this.gameService.calculatePlayerPositions();
    this.gameService.savePlayersToLocalStorage();
    this.gameService.saveConfigToLocalStorage();
    this.gameService.scoreChanged$.next();
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
