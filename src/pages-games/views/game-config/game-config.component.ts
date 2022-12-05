import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BottomControlsService } from 'src/pages-games/components/bottom-controls/bottom-controls.service';
import { PLAYERS_KEY } from 'src/pages-games/local-storage-keys';
import { PATHS } from 'src/pages-games/paths';
import { chinchonConfig } from 'src/pages-games/game-configs/chinchon-config';
import { GameConfig } from 'src/pages-games/game-configs/game-config';
import { otherConfig, highestScoreSorter, lowestScoreSorter } from 'src/pages-games/game-configs/other-config';
import { pochaConfig } from 'src/pages-games/game-configs/pocha-config';
import { unoConfig } from 'src/pages-games/game-configs/uno-config';
import { Player } from 'src/pages-games/interfaces/player';
import { GameService } from 'src/pages-games/services/game.service';

/**
 * This component screen allows to choose:
 *  - the game name
 *  - the number of cards used to play
 *  - the limit score
 *  - the winner of the game (highest or lowest score)
 *
 *  - allows to enter the player names and who starts dealing
 */
@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameConfigComponent implements OnInit, AfterViewInit {
  private readonly availableConfigs = [pochaConfig, chinchonConfig, unoConfig, otherConfig];
  public selectedConfigGame: GameConfig = pochaConfig;

  // game name
  public selectGameNameDropDownOpen = false;
  public gameNames = this.availableConfigs.map((c) => c.name);

  // number of cards
  public selectedNumberOfCards = 40;
  @ViewChild('numberOfCards')
  public numberOfCardsContainer: ElementRef<HTMLDivElement>;

  // players
  @ViewChildren('playerInput')
  private playerInputs: QueryList<ElementRef>;
  public playerNames: string[] = ['', '', '', ''];
  public playerStartsDealing: number = 0;

  // winner
  public winner: 'highestScore' | 'lowestScore' = 'highestScore';

  // limit score
  public selectedLimitScore = 100;
  @ViewChild('limitScore')
  public limitScoreContainer: ElementRef<HTMLDivElement>;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly bottomControlsService: BottomControlsService,
    private readonly gameService: GameService
  ) {}

  public ngOnInit(): void {
    this.loadPlayerNamesFromLocalStorage();
    this.bottomControlsService.onClickStartGameButton$.subscribe(() => this.onConfirmStartGame());
  }

  private loadPlayerNamesFromLocalStorage() {
    const previousGame = localStorage.getItem(PLAYERS_KEY);
    if (previousGame != null) {
      const { players }: { players: Player[] } = JSON.parse(previousGame);
      this.playerNames = players.sort((p1, p2) => p1.id - p2.id).map((p) => p.name);
      this.bottomControlsService.enableStartGameButton$.next(true);
    }
  }

  public onSelectGameName(gameName: string) {
    this.selectGameNameDropDownOpen = false;
    this.selectedConfigGame = this.availableConfigs.find((c) => c.name == gameName)!;
    this.changeDetectorRef.detectChanges();
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.selectedNumberOfCards = this.selectedConfigGame.cardsNumber ?? 40;
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
    this.selectedLimitScore = this.selectedConfigGame.limitScore ?? 100;
    this.changeDetectorRef.detectChanges();
    if (this.selectedConfigGame.name === otherConfig.name) {
      this.selectedConfigGame.sortPlayers = this.winner === 'highestScore' ? highestScoreSorter : lowestScoreSorter;
    }
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
  }

  public calculateNumberOfSelectedCards() {
    const scrollContainer = this.numberOfCardsContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.selectedNumberOfCards--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.selectedNumberOfCards++;
      scrollContainer.scroll(50, 0);
    }
  }

  public setWinnerConfigHighestScore() {
    this.winner = 'highestScore';
    this.selectedConfigGame.sortPlayers = highestScoreSorter;
  }

  public setWinnerConfigLowestScore() {
    this.winner = 'lowestScore';
    this.selectedConfigGame.sortPlayers = lowestScoreSorter;
  }

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public addPlayer() {
    this.playerNames.push('');
    this.changeDetectorRef.detectChanges();
    this.playerInputs.last.nativeElement.focus();
    this.bottomControlsService.enableStartGameButton$.next(false);
  }

  public deletePlayer(index: number) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    this.playerNames.splice(index, 1);
    const playerNameDealingIndex = this.playerNames.indexOf(playerNameDealing);
    const playerBefore = this.playerStartsDealing - 1;
    this.playerStartsDealing = playerNameDealingIndex !== -1 ? playerNameDealingIndex : playerBefore !== -1 ? playerBefore : 0;
    this.updateStatusStartGameButton();
  }

  public onReorderingPlayer(event: CdkDragDrop<string[]>) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    moveItemInArray(this.playerNames, event.previousIndex, event.currentIndex);
    this.playerStartsDealing = this.playerNames.indexOf(playerNameDealing);
  }

  public calculateSelectedLimitScore() {
    const scrollContainer = this.limitScoreContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.selectedLimitScore--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.selectedLimitScore++;
      scrollContainer.scroll(50, 0);
    }
  }

  public updateStatusStartGameButton() {
    this.bottomControlsService.enableStartGameButton$.next(this.playerNames.every((n) => n.trim() != ''));
  }

  public onConfirmStartGame() {
    this.gameService.createPlayersWithNames(this.playerNames);
    this.gameService.playersLoaded$.next();
    this.gameService.startsDealing = this.playerStartsDealing;
    this.gameService.config = this.selectedConfigGame;

    // overrides some values from default configuration
    if (this.selectedConfigGame.cardsNumber != undefined) {
      this.gameService.config.cardsNumber = this.selectedNumberOfCards;
    }
    if (this.selectedConfigGame.limitScore != null) {
      this.gameService.config.limitScore = this.selectedLimitScore;
    }

    this.router.navigate(['../', PATHS.RANKING], { relativeTo: this.activatedRoute });
  }
}