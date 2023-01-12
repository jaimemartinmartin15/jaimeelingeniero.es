import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { GameService } from 'src/pages-games/game-services/game.service';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';
import { GAME_SERVICES } from 'src/pages-games/pages-games.module';
import { Player } from 'src/pages-games/player';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit, AfterViewInit {
  public selectGameNameDropDownOpen = false;

  @ViewChild('numberOfCards')
  public numberOfCardsContainer: ElementRef<HTMLDivElement>;

  @ViewChild('limitScore')
  public limitScoreContainer: ElementRef<HTMLDivElement>;

  @ViewChildren('playerInput')
  private playerInputs: QueryList<ElementRef>;
  public playerNames: string[] = ['', '', '', ''];
  public playerStartsDealing: number = 0;

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(GAME_SERVICES) public gameServices: GameService[],
    public readonly gameHolderService: GameHolderService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    // load player names from previous game if available
    const previousPlayers = localStorage.getItem(LOCAL_STORE_KEYS.PLAYERS);
    if (previousPlayers != null) {
      const players: Player[] = JSON.parse(previousPlayers);
      this.playerNames = players.sort((p1, p2) => p1.id - p2.id).map((p) => p.name);
    }
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
  }

  public onSelectGameName(gameService: GameService) {
    this.selectGameNameDropDownOpen = false;
    this.gameHolderService.service = gameService;

    this.changeDetectorRef.detectChanges();
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
  }

  public calculateNumberOfSelectedCards() {
    const scrollContainer = this.numberOfCardsContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.gameHolderService.service.numberOfCards--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.gameHolderService.service.numberOfCards++;
      scrollContainer.scroll(50, 0);
    }
  }

  public get getNumberOfCards(): number {
    return this.gameHolderService.service.numberOfCards;
  }

  public set setNumberOfCards(value: number) {
    this.gameHolderService.service.numberOfCards = value;
  }

  public calculateLimitScore() {
    const scrollContainer = this.limitScoreContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.gameHolderService.service.limitScore--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.gameHolderService.service.limitScore++;
      scrollContainer.scroll(50, 0);
    }
  }

  public get getLimitScore(): number {
    return this.gameHolderService.service.limitScore;
  }

  public set setLimitScore(value: number) {
    this.gameHolderService.service.limitScore = value;
  }

  public setWinnerConfigHighestScore() {
    this.gameHolderService.service.winner = 'highestScore';
  }

  public setWinnerConfigLowestScore() {
    this.gameHolderService.service.winner = 'lowestScore';
  }

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public addPlayer() {
    this.playerNames.push('');
    this.changeDetectorRef.detectChanges();
    this.playerInputs.last.nativeElement.focus();
  }

  public onReorderingPlayer(event: CdkDragDrop<string[]>) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    moveItemInArray(this.playerNames, event.previousIndex, event.currentIndex);
    this.playerStartsDealing = this.playerNames.indexOf(playerNameDealing);
  }

  public deletePlayer(index: number) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    this.playerNames.splice(index, 1);
    const playerNameDealingIndex = this.playerNames.indexOf(playerNameDealing);
    const playerBefore = this.playerStartsDealing - 1;
    this.playerStartsDealing = playerNameDealingIndex !== -1 ? playerNameDealingIndex : playerBefore !== -1 ? playerBefore : 0;
  }

  public get startButtonDisabled(): boolean {
    return this.playerNames.some((p) => p.trim() === '');
  }

  public startGame() {
    this.gameHolderService.service.players = this.playerNames.map((name, id) => ({ id, name, scores: [], punctuation: 0 }));
    this.gameHolderService.service.playerStartsDealing = this.playerStartsDealing;

    localStorage.setItem(LOCAL_STORE_KEYS.TIME_GAME_STARTS, JSON.stringify(Date.now()));

    this.router.navigate(['../', ROUTING_PATHS.RANKING], { relativeTo: this.activatedRoute });
  }
}
